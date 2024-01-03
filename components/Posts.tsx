import React from "react";
import Link from "next/link";
import { ContentType, PostData } from "@lib/types";
import { useRouter } from "next/router";
import Chip from "@components/Chip";

type PostProps = {
  href: string;
  post: PostData;
  onSelectTag: (tag: string) => void;
};

const Post: React.FC<PostProps> = (props) => {
  const { post } = props;
  const date = new Date(post.datePublished).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col py-4 text-left border-b">
      <div className="flex items-center justify-between">
        <Link href={props.href}>
          <a className="text-xl font-semibold text-sky-600 hover:text-sky-500">
            {post.title}
          </a>
        </Link>
        <div className="flex row items-center space-x-2">
          <div className="flex row space-x-1">
            {post.tags?.map((t) => (
              <Chip
                key={`${post.id}-${t}`}
                value={t}
                onClick={() => props.onSelectTag(t)}
              />
            ))}
          </div>
          <p className="text-sm text-slate-500">{date}</p>
        </div>
      </div>
      <p className="mt-2">{post.description}</p>
    </div>
  );
};

type PostsProps = {
  type: ContentType;
  posts: PostData[];
};

const Posts: React.FC<PostsProps> = (props) => {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const posts = props.posts;
  if (posts.length === 0) {
    return <p className="text-xl text-left my-4">No posts!</p>;
  }

  const allTags = props.posts.reduce(
    (tags, post) => new Set([...tags, ...(post.tags ?? [])]),
    new Set<string>()
  );

  const selectTag = (tag: string) => {
    router.push({
      query: { ...router.query, tag },
    });
  };

  React.useEffect(() => {
    const queryTags = router.query.tag
      ? Array.isArray(router.query.tag)
        ? router.query.tag
        : [router.query.tag]
      : [];

    const validTags = queryTags.filter((t) => allTags.has(t));
    setSelectedTags(validTags);
  }, [router.query]);

  return (
    <div className="space-y-4">
      <ul>
        {posts
          .filter(
            (post) =>
              selectedTags.length === 0 ||
              post.tags?.some((t) => selectedTags.includes(t))
          )
          .map((post) => {
            return (
              <li key={post.id}>
                <Post
                  href={`${props.type}/${post.id}`}
                  post={post}
                  onSelectTag={selectTag}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Posts;
