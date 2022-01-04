import type { NextPage } from "next";
import Head from "next/head";
import NavItem from "@components/NavItem";
import Footer from "@components/Footer";
import globals from "@lib/globals";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>{globals.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Welcome!</h1>

        <div className="flex flex-row items-center mt-6">
          <NavItem destinationPath="/blog" label="Blog" />
          <NavItem destinationPath="/pictures" label="Pictures" />
          <NavItem destinationPath="/projects" label="Projects" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
