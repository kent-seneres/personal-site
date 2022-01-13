import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const setViewHeight = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setViewHeight();

    window.addEventListener("resize", setViewHeight);
    return () => window.removeEventListener("resize", setViewHeight);
  });

  return <Component {...pageProps} />;
}

export default MyApp;
