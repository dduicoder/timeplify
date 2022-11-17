import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import type { AppProps } from "next/app";

import "../styles/globals.css";

import NotificationProvider from "../components/notification/NotificationProvider";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  });

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="../static/favicon.ico" />
      </Head>
      <NotificationProvider>
        <div id="overlays"></div>
        {loading && <div className="loader" />}
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </NotificationProvider>
    </>
  );
};

export default App;
