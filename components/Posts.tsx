import Link from "next/link";
import { ContentType, PostData } from "@lib/types";

type PostProps = {
  href: string;
  post: PostData;
};

const Post: React.FC<PostProps> = (props) => {
  const { post } = props;

  const date = new Date(post.datePublished).toLocaleDateString();

  return (
    <div className="flex flex-col my-4 p-4 text-left border rounded-md shadow-md">
      <div className="flex items-center justify-between">
        <Link href={props.href}>
          <a className="text-xl font-semibold text-blue-500">{post.title}</a>
        </Link>
        <p className="text-sm text-slate-500">{date}</p>
      </div>
      <p className="mt-4">{post.description}</p>
    </div>
  );
};

type PostsProps = {
  type: ContentType;
  posts: PostData[];
};

const Posts: React.FC<PostsProps> = (props) => {
  const posts = props.posts;

  if (posts.length === 0) {
    return <p className="text-xl text-left my-4">No posts!</p>;
  }

  return (
    <ul>
      {posts.map((post) => {
        return (
          <li key={post.id}>
            <Post href={`${props.type}/${post.id}`} post={post} />
          </li>
        );
      })}
    </ul>
  );
};

export default Posts;
