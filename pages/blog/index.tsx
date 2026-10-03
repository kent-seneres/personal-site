import { GetStaticProps, NextPage } from "next/types";
import { loadBlogPosts } from "@lib/loader";
import { ContentType, PostData } from "@lib/types";
import globals from "@lib/globals";
import PageWrapper from "@components/PageWrapper";
import Posts from "@components/Posts";

export type BlogProps = {
  title: string;
  description: string;
  posts: PostData[];
};

const Blog: NextPage<BlogProps> = (props) => {
  const { title, description, posts } = props;
  const pageTitle = `Blog - ${globals.name}`;

  return (
    <PageWrapper title={pageTitle}>
      <div className="self-stretch m-4 pb-4 text-left border-b">
        <h1 className="text-4xl font-semibold my-2">{title}</h1>
        <p className="text-md">{description}</p>
      </div>
      <section className="flex-1 self-stretch mx-4">
        <Posts type={ContentType.Blog} posts={posts} />
      </section>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<BlogProps> = () => {
  const posts = loadBlogPosts();

  return {
    props: {
      posts,
      title: "Blog Posts",
      description: "Collection of random thoughts. Cheers!",
    },
  };
};

export default Blog;
