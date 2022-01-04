import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { getFiles, loadBlogPost } from "@lib/loader";
import { PostData, ContentType } from "@lib/types";
import Markdown from "@components/Markdown";

type BlogPostProps = {
  post: PostData;
};

const BlogPost: NextPage<BlogPostProps> = (props) => {
  const { title, subtitle, content } = props.post;
  return (
    <div>
      <div>
        {title && <h1>{title}</h1>}
        {subtitle && <h2>{subtitle}</h2>}
        <br />
      </div>

      <div>
        <Markdown content={content} />
      </div>
    </div>
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
