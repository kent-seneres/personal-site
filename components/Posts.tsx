import Link from "next/link";
import { ContentType, PostData } from "@lib/types";

type PostsProps = {
  type: ContentType;
  posts: PostData[];
};

const Posts: React.FC<PostsProps> = (props) => {
  const posts = props.posts;

  return (
    <div>
      {posts.length === 0 && <div>No posts!</div>}
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <Link href={{ pathname: `${props.type}/${post.id}` }}>
                <a>{post.title}</a>
              </Link>
              {`: ${post.description}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Posts;
