import { GetStaticProps, NextPage } from "next/types";
import { loadBlogPosts } from "@lib/loader";
import { ContentType, PostData } from "@lib/types";
import Posts from "@components/Posts";
import PageWrapper from "@components/PageWrapper";
import Head from "next/head";

export type BlogProps = {
  posts: PostData[];
  title: string;
  description: string;
};

const Blog: NextPage<BlogProps> = (props) => {
  const { posts, title, description } = props;

  return (
    <PageWrapper title="Blog">
      <div>
        {<h1>{title}</h1>}
        {<h3>{description}</h3>}
        <br />
      </div>
      <Posts type={ContentType.Blog} posts={posts} />
    </PageWrapper>
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
