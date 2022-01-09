import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import globals from "@lib/globals";
import { loadPost } from "@lib/loader";
import { ContentType, PostData } from "@lib/types";
import PageWrapper from "@components/PageWrapper";
import Markdown from "@components/Markdown";

import profile from "public/images/profile.jpg";

type AboutProps = {
  aboutPost: PostData;
};

const About: NextPage<AboutProps> = (props) => {
  const pageTitle = `About - ${globals.name}`;
  return (
    <PageWrapper title={pageTitle}>
      <div className="self-stretch m-4 py-4 border-b text-left">
        <h1 className="text-4xl font-semibold my-2">About</h1>
      </div>
      <div className="flex flex-col sm:flex-row flex-1 self-stretch">
        <div className="flex flex-col mx-auto sm:m-4">
          <Image
            src={profile}
            alt="Picture of the author"
            width={256}
            height={256}
            className="rounded-2xl"
            placeholder="blur"
          />
          <p className="mt-4 text-xl font-medium">{globals.name}</p>
          <p className="text-md text-slate-400">{globals.jobTitle}</p>
        </div>
        <section className="text-left m-4">
          <Markdown content={props.aboutPost.content} />
        </section>
      </div>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<AboutProps> = () => {
  const aboutPost = loadPost(ContentType.General, "about");

  return { props: { aboutPost } };
};

export default About;
