import { NextPage } from "next";
import Head from "next/head";

import NotFound from "../components/layouts/NotFound";

const ErrorPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 Not Found - Timeplifey</title>
      </Head>
      <NotFound />
    </>
  );
};

export default ErrorPage;
