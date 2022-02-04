import { CommentType } from "@lib/redis/constants";

type CommentProps = {
  comment: CommentType;
};

const Comment: React.FC<CommentProps> = (props) => {
  const comment = props.comment;
  const time = new Date(comment.createdAt);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  };

  return (
    <div className="flex flex-col items-start p-3 rounded-md my-3 bg-slate-50/60 text-left">
      <div className="flex flex-row items-center space-x-2">
        <p className="font-semibold">{comment.name}</p>
        <span>•</span>
        <p className="font-light text-sm" title={time.toLocaleString()}>
          {time.toLocaleString(undefined, options)}
        </p>
      </div>
      <p className="font-light">{comment.content}</p>
    </div>
  );
};

export default Comment;
