import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/client";

import "@fortawesome/fontawesome-svg-core/styles.css";

import NotificationProvider from "../components/notification/NotificationProvider";
import Up from "../components/UI/Up";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import Head from "next/head";

import "../styles/calendar.scss";
import "../styles/globals.scss";

const App = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  const isIndex = router.pathname === "/";

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="../static/favicon.ico" />
      </Head>
      <ApolloProvider client={client}>
        <NotificationProvider>
          <div className="overlays">
            <Up />
          </div>
          {loading && <div className="loading-bar" />}
          {isIndex ? (
            <main className="index">
              <Header />
              <Component />
              <Footer />
            </main>
          ) : (
            <>
              <Header />
              <main>
                <Component {...pageProps} />
              </main>
              <Footer />
            </>
          )}
        </NotificationProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
