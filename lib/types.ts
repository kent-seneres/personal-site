export type PostData = {
  id: string;
  title: string;
  content: string;

  published: boolean;
  datePublished: number;

  subtitle?: string;
  description?: string;
  tags?: string[];

  bannerPhoto?: string;
  thumbnailPhoto?: string;
};

export enum ContentType {
  General = "/",
  Blog = "/blog",
}

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
