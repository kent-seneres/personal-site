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
