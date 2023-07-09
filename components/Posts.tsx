import React from "react";
import Link from "next/link";
import { ContentType, PostData } from "@lib/types";
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
  const posts = props.posts;

  if (posts.length === 0) {
    return <p className="text-xl text-left my-4">No posts!</p>;
  }

  const allTags = props.posts.reduce(
    (tags, post) => new Set([...tags, ...(post.tags ?? [])]),
    new Set<string>()
  );

  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [showTagFilter, setShowTagFilter] = React.useState(false);

  const toggleTagSelection = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prev) => prev.filter((t) => t !== tag));
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const selectTag = (tag: string) => {
    setShowTagFilter(true);
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  return (
    <div className="space-y-4">
      {showTagFilter && (
        <div className="flex row space-x-1 items-center">
          <p className="text-sm">Filter by:</p>
          {[...allTags].map((t) => (
            <Chip
              key={`summary-${t}`}
              value={t}
              highlighted={selectedTags.includes(t)}
              onClick={() => toggleTagSelection(t)}
            />
          ))}
        </div>
      )}
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
