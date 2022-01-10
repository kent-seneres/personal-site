import type { NextPage } from "next";
import globals from "@lib/globals";
import PageWrapper from "@components/PageWrapper";
import LinkButton from "@components/LinkButton";

const Error404: NextPage = () => {
  return (
    <PageWrapper title={globals.name}>
      <h1 className="text-6xl font-bold">Ruh Roh!</h1>
      <p className="text-md my-2">[404] This page could not be found.</p>

      <LinkButton href="/">Go Home</LinkButton>
    </PageWrapper>
  );
};

export default Error404;
