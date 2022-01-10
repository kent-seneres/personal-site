import { auth, drive } from "@googleapis/drive";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { getPlaiceholder } from "plaiceholder";

export type Photo = {
  path: string;
  blurDataURL: string;
  id: string;
  name: string;
  modifiedTime: string;
  imageMediaMetadata: {
    height: number;
    width: number;
  };
  description: string | null;
};

const getDriveApi = (scopes: string | string[]) => {
  const jwt = new auth.JWT({
    email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
    key: process.env.GOOGLE_DRIVE_PRIVATE_KEY,
    scopes: scopes,
  });

  return drive({ version: "v3", auth: jwt });
};

const ROOT_PUBLIC_PATH = "public";

const getImageFilePath = (fileName: string): string => {
  return path.join(ROOT_PUBLIC_PATH, "images", "drive", fileName);
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

export const getPhotos = async (): Promise<Photo[]> => {
  const PHOTOS_FOLDER_ID = "1-e1OoDPxuuN6S89vbSMSXNBVwd2Ujj9V";
  const photos: Photo[] = [];

  const scopes = ["https://www.googleapis.com/auth/drive.readonly"];
  const driveApi = getDriveApi(scopes);

  try {
    // get all files in the photos folder
    const response = await driveApi.files.list({
      q: `'${PHOTOS_FOLDER_ID}' in parents`,
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
      const blurPlaceholder = await getPlaiceholder(imagePath);

      // assert that properties are defined, since they should be included in query
      photos.push({
        path: imagePath,
        blurDataURL: blurPlaceholder.base64,
        id: file.id!,
        name: file.name!,
        modifiedTime: file.modifiedTime!,
        imageMediaMetadata: {
          height: file.imageMediaMetadata?.height!,
          width: file.imageMediaMetadata?.width!,
        },
        description: file.description ?? null,
      });
    }
  } catch (err) {
    console.log(err);
  }

  return photos;
};
