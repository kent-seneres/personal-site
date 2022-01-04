import { GetStaticProps } from "next/types";
import Link from "next/link";
import { loadBlogPosts, PostData } from "@lib/loader";

export type BlogPostsProps = {
  posts: PostData[];
};

const BlogPosts: React.FC<BlogPostsProps> = (props) => {
  const posts = props.posts;

  return (
    <div className="posts">
      {posts.length === 0 && <div>No posts!</div>}
      <ul>
        {posts.map((post) => {
          return (
            <article key={post.id} className="post-title">
              <Link href={{ pathname: `/blog/${post.id}` }}>
                <a>{post.title}</a>
              </Link>{" "}
              - {post.description}
            </article>
          );
        })}
      </ul>
    </div>
  );
};

export type BlogProps = {
  posts: PostData[];
  title: string;
  description: string;
};

const Blog: React.FC<BlogProps> = (props) => {
  const { posts, title, description } = props;

  return (
    <section className="blog-posts">
      <div className="blog-post-title">
        {<h1>{title}</h1>}
        {<h2>{description}</h2>}
        <br />
      </div>
      <BlogPosts posts={posts} />
    </section>
  );
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const posts = await loadBlogPosts();

  return {
    props: {
      posts,
      title: "Blog",
      description: "Random",
    },
  };
};

export default Blog;
