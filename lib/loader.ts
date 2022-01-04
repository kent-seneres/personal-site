import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

type RawFile = { path: string; contents: string };

const MD_FILE_DIR = "./data/md";

export const getFiles = () => {
  return fs.readdirSync(MD_FILE_DIR, "utf8");
};

export const loadMarkdownFile = (id: string): RawFile => {
  const mdFile = fs.readFileSync(path.join(MD_FILE_DIR, `${id}.md`), "utf8");
  return { path: id, contents: mdFile };
};

export const markdownToPost = (file: RawFile): PostData => {
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

export const loadPost = async (id: string): Promise<PostData> => {
  const file = loadMarkdownFile(id);
  return markdownToPost(file);
};

export const loadMarkdownFiles = () => {
  const blogs = getFiles();
  const paths = blogs.map((filename) => {
    const id = filename.replace(/\.md/, "");
    return loadMarkdownFile(id);
  });

  return paths;
};

export const loadBlogPosts = async (): Promise<PostData[]> => {
  return loadMarkdownFiles()
    .map(markdownToPost)
    .filter((p) => p.published)
    .sort((a, b) => (b.datePublished ?? 0) - (a.datePublished ?? 0));
};
