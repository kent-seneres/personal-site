import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { getFiles, loadBlogPost } from "@lib/loader";
import { PostData, ContentType } from "@lib/types";
import PageWrapper from "@components/PageWrapper";
import Markdown from "@components/Markdown";

type BlogPostProps = {
  post: PostData;
};

const BlogPost: NextPage<BlogPostProps> = (props) => {
  const { post } = props;
  const date = new Date(post.datePublished).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PageWrapper title={post.title}>
      <div className="self-stretch m-4 py-4 border-b">
        <p className="text-sm text-slate-500">{date}</p>
        <h1 className="text-5xl font-semibold my-2">{post.title}</h1>
      </div>
      <section className="flex-1 w-screen max-w-2xl p-4 text-left">
        <Markdown content={post.content} />
      </section>
    </PageWrapper>
  );
};

interface Params extends ParsedUrlQuery {
  blog: string;
}

export const getStaticProps: GetStaticProps<BlogPostProps, Params> = (
  context
) => {
  const post = loadBlogPost(context.params!.blog);
  return { props: { post } };
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const blogs = getFiles(ContentType.Blog);
  const paths = blogs.map((filename) => ({
    params: { blog: filename },
  }));

  return { paths, fallback: false };
};

export default BlogPost;
