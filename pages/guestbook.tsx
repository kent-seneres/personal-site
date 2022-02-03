import type { NextPage } from "next";
import PageWrapper from "@components/PageWrapper";
import { useComments } from "@modules/guestbook";

const GuestBook: NextPage = () => {
  const pageTitle = `Guestbook`;

  const { data, error, submit } = useComments();

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <PageWrapper title={pageTitle}>
      <div className="self-stretch m-4 pb-2 border-b text-left">
        <h1 className="text-4xl font-semibold my-2">{pageTitle}</h1>
      </div>
      <div className="flex flex-col flex-1 self-stretch m-4 space-y-4">
        <form
          className="flex flex-col space-y-4 items-center"
          onSubmit={submit}
        >
          <input className="p-2 rounded-md" name="name" type="text" />
          <textarea className="p-2 rounded-md" name="content" />
          <button
            className="rounded-lg p-2 w-24 bg-sky-600 text-slate-50"
            type="submit"
          >
            Submit
          </button>
        </form>
        <div>
          {data.map((c) => {
            return (
              <div
                key={c.entityId}
                className="flex flex-col items-start p-4 rounded-lg my-2 bg-slate-50"
              >
                <div className="flex flex-row items-center space-x-2">
                  <p className="font-semibold">{c.name}</p>
                  <p className="font-light text-sm">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="font-light">{c.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
};

export default GuestBook;
