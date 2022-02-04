import type { NextPage } from "next";
import PageWrapper from "@components/PageWrapper";
import { Comment, CommentForm, useComments } from "@modules/guestbook";
import globals from "@lib/globals";

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
