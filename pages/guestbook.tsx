import type { NextPage } from "next";
import PageWrapper from "@components/PageWrapper";
import { CommentForm, useComments } from "@modules/guestbook";
import { CommentType } from "@lib/redis/constants";
import globals from "@lib/globals";

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
    <div className="flex flex-col items-start p-3 rounded-lg my-3 bg-slate-50/60 text-left">
      <div className="flex flex-row items-center space-x-2">
        <p className="font-semibold">{comment.name}</p>
        <p className="font-light text-sm" title={time.toLocaleString()}>
          {time.toLocaleString(undefined, options)}
        </p>
      </div>
      <p className="font-light">{comment.content}</p>
    </div>
  );
};

const ErrorMessage: React.FC = () => {
  return (
    <div className="p-4">
      <p className="font-bold text-lg">Error loading comments</p>
      <p>Please try again later.</p>
    </div>
  );
};

const GuestBook: NextPage = () => {
  const pageTitle = `Guestbook - ${globals.name}`;

  const { data, error } = useComments();

  return (
    <PageWrapper title={pageTitle}>
      <div className="self-stretch m-4 pb-2 border-b text-left">
        <h1 className="text-4xl font-semibold my-2">Guestbook</h1>
      </div>
      <div className="flex flex-col flex-1 self-stretch m-4 space-y-4">
        <CommentForm />
        <div>
          {error && <ErrorMessage />}
          {data && data.map((c) => <Comment key={c.entityId} comment={c} />)}
        </div>
      </div>
    </PageWrapper>
  );
};

export default GuestBook;
