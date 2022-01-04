import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { Markdown } from "@components/Markdown";
import { getFiles, loadPost, PostData } from "@lib/loader";

export type BlogPostProps = {
  post: PostData;
};

export const BlogPost: React.FC<BlogPostProps> = (props) => {
  const { title, subtitle, content } = props.post;
  return (
    <div className="blog-post">
      <div className="blog-post-title">
        {title && <h1>{title}</h1>}
        {subtitle && <h2>{subtitle}</h2>}
        <br />
      </div>

      <div className="blog-post-content">
        <Markdown source={content} />
      </div>
    </div>
  );
};

const Post: React.FC<BlogPostProps> = (props) => {
  const { post } = props;
  return <BlogPost post={post} />;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<BlogPostProps, Params> = async (
  context
) => {
  const post = await loadPost(context.params!.id);
  return { props: { post } };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const blogs = getFiles();
  const paths = blogs.map((filename) => ({
    params: { id: filename.replace(/\.md/, "") },
  }));

  return { paths, fallback: false };
};

export default Post;
