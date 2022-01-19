import type { NextPage } from "next";
import globals from "@lib/globals";
import PageWrapper from "@components/PageWrapper";
import Nav from "@components/Nav";

const Home: NextPage = () => {
  return (
    <PageWrapper title={globals.name}>
      <h1 className="text-6xl font-bold">Welcome!</h1>
      <p className="my-2 font-light bg-amber-200 px-8 py-1 shadow-lg">
        🚧 Site Under Construction 🚧
      </p>
      <div className="mt-4">
        <Nav alwaysVisible={true} />
      </div>
    </PageWrapper>
  );
};

export default Home;
