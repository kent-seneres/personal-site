import { auth, drive } from "@googleapis/drive";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { getPlaiceholder } from "plaiceholder";
import { Photo } from "./types";

const ROOT_PUBLIC_PATH = "public";
const DRIVE_IMAGE_PATH = path.join(ROOT_PUBLIC_PATH, "images", "drive");
const IMAGE_METADATA_FILE = path.join(
  ROOT_PUBLIC_PATH,
  "drive-images-metadata.json"
);

const getDriveApi = (scopes: string | string[]) => {
  const jwt = new auth.JWT({
    email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
    key: process.env.GOOGLE_DRIVE_PRIVATE_KEY,
    scopes: scopes,
  });

  return drive({ version: "v3", auth: jwt });
};

const getImageFilePath = (fileName: string): string => {
  return path.join(DRIVE_IMAGE_PATH, fileName);
};

const downloadFile = async (url: string, filePath: string) => {
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(filePath);

  await new Promise((resolve, reject) => {
    res.body?.pipe(fileStream);
    res.body?.on("error", reject);
    fileStream.on("finish", resolve);
  });
};

const getImageTime = (
  filename: string,
  timestamp: string | undefined
): Date => {
  if (timestamp) {
    const parts = timestamp.split(" ");
    if (parts.length === 2) {
      let [date, time] = parts;
      date = date.replaceAll(":", "-");

      const formatted = `${date}T${time}`;
      return new Date(formatted);
    }

    return new Date(timestamp);
  }

  const match = filename.match(
    /.*_*(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2}).*/
  );
  if (match) {
    const [_, year, month, day, hh, mm, ss] = match;
    const formatted = `${year}-${month}-${day}T${hh}:${mm}:${ss}`;

    return new Date(formatted);
  }

  return new Date();
};

export const getPhotos = async (): Promise<Photo[]> => {
  const DEFAULT_BLUR_BASE_64 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAEElEQVQImWOQ1rCFIwacHABzjwYBnpNl1QAAAABJRU5ErkJggg==";

  const scopes = ["https://www.googleapis.com/auth/drive.readonly"];
  const driveApi = getDriveApi(scopes);
  const photos: Photo[] = [];

  try {
    if (!fs.existsSync(DRIVE_IMAGE_PATH)) {
      fs.mkdirSync(DRIVE_IMAGE_PATH, { recursive: true });
    }

    // get all files in the photos folder
    const response = await driveApi.files.list({
      q: `'${process.env.GOOGLE_DRIVE_PHOTOS_FOLDER_ID}' in parents`,
      // query fields must include relevant properties indicated in `Photo` type
      fields:
        "files(id, name, description, fileExtension, modifiedTime, imageMediaMetadata, webContentLink)",
    });

    for (const file of response.data.files ?? []) {
      const filePath = getImageFilePath(`${file.id}.${file.fileExtension}`);
      if (file.webContentLink && !fs.existsSync(filePath)) {
        await downloadFile(file.webContentLink, filePath);
      }

      // trim off root public directory from path for image src
      const imagePath = filePath.replace(ROOT_PUBLIC_PATH, "");

      let blurPlaceholder = null;
      try {
        blurPlaceholder = await getPlaiceholder(imagePath);
      } catch (e: any) {
        console.log(`Failed to generate placeholder blur: ${e.message}`);
      }

      const time = getImageTime(file.name!, file.imageMediaMetadata?.time);

      // assert that properties are defined, since they should be included in query
      photos.push({
        path: imagePath,
        blurDataURL: blurPlaceholder?.base64 ?? DEFAULT_BLUR_BASE_64,
        id: file.id!,
        name: file.name!,
        modifiedTime: time.toISOString(),
        imageMediaMetadata: {
          height: file.imageMediaMetadata!.height!,
          width: file.imageMediaMetadata!.width!,
        },
        description: file.description ?? null,
      });
    }
  } catch (err) {
    console.log(err);
  }

  // cache photo metadata into filesystem for reuse
  const data = JSON.stringify(photos);
  fs.writeFileSync(IMAGE_METADATA_FILE, data);

  return photos;
};

/**
 * File will be populated as part of `getPhotos` call
 */
export const getMetadataFile = () => {
  return IMAGE_METADATA_FILE.replace(ROOT_PUBLIC_PATH, "");
};
