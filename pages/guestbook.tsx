import type { NextPage } from "next";
import PageWrapper from "@components/PageWrapper";
import { useComments } from "@modules/guestbook";
import {
  CommentType,
  CONTENT_CHAR_LIMIT,
  NAME_CHAR_LIMIT,
} from "@lib/redis/constants";
import { FormEventHandler } from "react";

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
    <div className="flex flex-col items-start p-3 rounded-lg my-2 bg-slate-50 text-left">
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

type CommentFormProps = {
  loading: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

const CommentForm: React.FC<CommentFormProps> = (props) => {
  return (
    <form
      className="flex flex-col self-center space-y-4 items-center max-w-xl w-full"
      onSubmit={props.onSubmit}
    >
      <div className="flex flex-col items-start space-y-1 w-full">
        <label className="font-semibold">Name</label>
        <input
          className="p-2 rounded-md focus:outline-none w-full"
          id="name"
          name="name"
          type="text"
          maxLength={NAME_CHAR_LIMIT}
          required
        />
      </div>
      <div className="flex flex-col items-start space-y-1 w-full">
        <label className="font-semibold">Message</label>
        <textarea
          className="p-2 rounded-md focus:outline-none w-full"
          name="content"
          maxLength={CONTENT_CHAR_LIMIT}
        />
      </div>
      <button
        className="flex flex-row rounded-xl px-6 py-2 bg-sky-600 space-x-2 text-slate-50 disabled:opacity-80"
        type="submit"
        disabled={props.loading}
      >
        <span>{props.loading ? "Loading" : "Submit"}</span>
        {props.loading && (
          <div className="flex items-center justify-center space-x-1 animate-pulse">
            <div className="w-4 h-4 bg-slate-100 rounded-full"></div>
            <div className="w-4 h-4 bg-slate-100 rounded-full"></div>
            <div className="w-4 h-4 bg-slate-100 rounded-full"></div>
          </div>
        )}
      </button>
    </form>
  );
};

const GuestBook: NextPage = () => {
  const pageTitle = `Guestbook`;

  const { data, error, submit, submitLoading } = useComments();

  return (
    <PageWrapper title={pageTitle}>
      <div className="self-stretch m-4 pb-2 border-b text-left">
        <h1 className="text-4xl font-semibold my-2">{pageTitle}</h1>
      </div>
      <div className="flex flex-col flex-1 self-stretch m-4 space-y-4">
        <CommentForm onSubmit={submit} loading={submitLoading} />
        <div>
          {error && <ErrorMessage />}
          {data && data.map((c) => <Comment key={c.entityId} comment={c} />)}
        </div>
      </div>
    </PageWrapper>
  );
};

export default GuestBook;
