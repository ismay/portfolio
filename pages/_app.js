/* eslint-disable react/prop-types, react/jsx-props-no-spreading, global-require */

import "../styles/globals.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../components/header";
import LoadingIndicator from "../components/loading-indicator";
import Main from "../components/main";
import Page from "../components/page";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../.msw");
}

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };
    const handleRouteChangeEnd = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeEnd);
    router.events.on("routeChangeError", handleRouteChangeEnd);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeEnd);
      router.events.off("routeChangeError", handleRouteChangeEnd);
    };
  });

  return (
    <Page>
      <Head>
        <link
          href="/favicon/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link
          href="/favicon/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <script
          async
          data-dnt="false"
          data-host="https://microanalytics.io"
          defer
          id="ZwSg9rf6GA"
          src="https://microanalytics.io/js/script.js"
        />
      </Head>
      <Header />
      <Main>
        <Component {...pageProps} />
      </Main>
      <LoadingIndicator isLoading={isLoading} />
    </Page>
  );
}
