import { GetStaticProps, NextPage } from "next/types";
import { loadBlogPosts } from "@lib/loader";
import { ContentType, PostData } from "@lib/types";
import Posts from "@components/Posts";
import PageWrapper from "@components/PageWrapper";

export type BlogProps = {
  title: string;
  description: string;
  posts: PostData[];
};

const Blog: NextPage<BlogProps> = (props) => {
  const { title, description, posts } = props;

  return (
    <PageWrapper title="Blog">
      <div className="self-start m-4 text-left">
        <p className="text-4xl font-semibold my-2">{title}</p>
        <p className="text-md">{description}</p>
      </div>
      <div className="flex-1 self-stretch mx-4">
        <Posts type={ContentType.Blog} posts={posts} />
      </div>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<BlogProps> = () => {
  const posts = loadBlogPosts();

  return {
    props: {
      posts,
      title: "Blog Posts",
      description: "Collection of random thoughts, cheers.",
    },
  };
};

export default Blog;
