import { GetStaticProps, NextPage } from "next/types";
import { loadBlogPosts } from "@lib/loader";
import { ContentType, PostData } from "@lib/types";
import Posts from "@components/Posts";

export type BlogProps = {
  posts: PostData[];
  title: string;
  description: string;
};

const Blog: NextPage<BlogProps> = (props) => {
  const { posts, title, description } = props;

  return (
    <section>
      <div>
        {<h1>{title}</h1>}
        {<h3>{description}</h3>}
        <br />
      </div>
      <Posts type={ContentType.Blog} posts={posts} />
    </section>
  );
};

export const getStaticProps: GetStaticProps<BlogProps> = () => {
  const posts = loadBlogPosts();

  return {
    props: {
      posts,
      title: "Blog",
      description: "Random",
    },
  };
};

export default Blog;
