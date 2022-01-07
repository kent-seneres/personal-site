import Header from "@components/Header";
import Footer from "@components/Footer";
import Head from "next/head";
import globals from "@lib/globals";

type PageWrapperProps = {
  title?: string;
  iconPath?: string;
};

const PageWrapper: React.FC<PageWrapperProps> = (props) => {
  const title = props.title ?? globals.name;
  const iconPath = props.iconPath ?? "/favicon.ico";

  return (
    <div className="bg-gradient-to-r to-sky-100 from-slate-100 ">
      <div className="max-w-4xl mx-auto p-2 ">
        <Head>
          <title>{title}</title>
          <link rel="icon" href={iconPath} />
        </Head>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
            {props.children}
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PageWrapper;
