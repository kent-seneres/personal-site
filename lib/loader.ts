import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ContentType, PostData } from "@lib/types";

const MD_FILE_DIR = "./data/md";

type RawFile = { path: string; contents: string };

const loadMarkdownFile = (type: ContentType, id: string): RawFile => {
  const mdFile = fs.readFileSync(
    path.join(MD_FILE_DIR, type, `${id}.md`),
    "utf8"
  );
  return { path: id, contents: mdFile };
};

const markdownToPost = (file: RawFile): PostData => {
  const metadata = matter(file.contents);
  const post: PostData = {
    id: file.path,
    title: metadata.data.title,
    content: metadata.content,

    published: metadata.data.published ?? false,
    datePublished: metadata.data.datePublished ?? null,

    subtitle: metadata.data.subtitle ?? null,
    description: metadata.data.description ?? null,
    tags: metadata.data.tags ?? null,
    bannerPhoto: metadata.data.bannerPhoto ?? null,
    thumbnailPhoto: metadata.data.thumbnailPhoto ?? null,
  };

  if (!post.title) throw new Error(`Missing required field: title.`);
  if (!post.content) throw new Error(`Missing required field: content.`);
  if (!post.datePublished)
    throw new Error(`Missing required field: datePublished.`);

  return post;
};

export const getFiles = (type: ContentType): string[] => {
  return fs
    .readdirSync(path.join(MD_FILE_DIR, type), "utf8")
    .map((filename) => filename.replace(/\.md/, ""));
};

export const loadBlogPost = (id: string): PostData => {
  const file = loadMarkdownFile(ContentType.Blog, id);
  return markdownToPost(file);
};

export const loadBlogPosts = (): PostData[] => {
  return getFiles(ContentType.Blog)
    .map((filename) => loadMarkdownFile(ContentType.Blog, filename))
    .map((file) => markdownToPost(file))
    .filter((p) => p.published)
    .sort((a, b) => (b.datePublished ?? 0) - (a.datePublished ?? 0));
};
