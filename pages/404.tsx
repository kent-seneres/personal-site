import type { NextPage } from "next";
import globals from "@lib/globals";
import PageWrapper from "@components/PageWrapper";
import Nav from "@components/Nav";

const Error404: NextPage = () => {
  return (
    <PageWrapper title={globals.name}>
      <h1 className="text-6xl font-bold">Ruh Roh!</h1>
      <h1 className="text-md my-2">[404] This page could not be found.</h1>
    </PageWrapper>
  );
};

export default Error404;
