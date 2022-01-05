import type { NextPage } from "next";
import Link from "next/link";
import globals from "@lib/globals";
import PageWrapper from "@components/PageWrapper";

const Error404: NextPage = () => {
  return (
    <PageWrapper title={globals.name}>
      <p className="text-6xl font-bold">Ruh Roh!</p>
      <p className="text-md my-2">[404] This page could not be found.</p>

      <Link href={"/"}>
        <a className="m-2 p-2 text-center border border-slate-300 w-24 rounded-xl hover:text-sky-500 hover:border-sky-500 focus:text-sky-600">
          Go Home
        </a>
      </Link>
    </PageWrapper>
  );
};

export default Error404;
