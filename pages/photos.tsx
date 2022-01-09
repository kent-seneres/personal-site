import PageWrapper from "@components/PageWrapper";
import globals from "@lib/globals";
import { NextPage } from "next/types";

export type PhotosProps = {};

const Photos: NextPage<PhotosProps> = (props) => {
  const pageTitle = `Pictures - ${globals.name}`;

  return (
    <PageWrapper title={pageTitle}>
      <div className="self-stretch m-4 py-4 text-left border-b">
        <h1 className="text-4xl font-semibold my-2">Photos</h1>
      </div>
      <section className="flex-1 self-stretch mx-4">
        {/* <Posts type={ContentType.Blog} posts={posts} /> */}
      </section>
    </PageWrapper>
  );
};

export default Photos;
