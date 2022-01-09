import { auth, drive } from "@googleapis/drive";

const getDriveApi = (scopes: string | string[]) => {
  const jwt = new auth.JWT({
    email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
    key: process.env.GOOGLE_DRIVE_PRIVATE_KEY,
    scopes: scopes,
  });

  return drive({ version: "v3", auth: jwt });
};

export type Photo = {
  id: string;
  name: string;
  modifiedTime: string;
  imageMediaMetadata: {
    height: number;
    width: number;
  };
  webContentLink: string;
  description?: string;
};

export const getPhotos = async (): Promise<Photo[]> => {
  const PHOTOS_FOLDER_ID = "1-e1OoDPxuuN6S89vbSMSXNBVwd2Ujj9V";

  const scopes = ["https://www.googleapis.com/auth/drive.readonly"];
  const driveApi = getDriveApi(scopes);

  try {
    // get all files in the photos folder
    const response = await driveApi.files.list({
      q: `'${PHOTOS_FOLDER_ID}' in parents`,
      fields:
        "files(id, name, description, modifiedTime, imageMediaMetadata, webContentLink)",
    });

    const photos = response.data.files?.map((file) => file as Photo) ?? [];
    console.log(photos);
    return photos;
  } catch (err) {
    console.log(err);
  }

  return [];
};
