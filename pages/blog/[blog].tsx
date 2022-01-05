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
  const date = new Date(post.datePublished).toLocaleDateString();

  return (
    <PageWrapper title={post.title}>
      <div className="self-start m-4 text-left">
        <p className="text-4xl font-medium my-2">{post.title}</p>
        <p className="text-sm text-slate-500">{date}</p>
      </div>
      <div className="flex-1 self-stretch text-left m-4">
        <Markdown content={post.content} />
      </div>
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
