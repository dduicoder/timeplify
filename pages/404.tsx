import Head from "next/head";
import { FC } from "react";
import NotFound from "../components/layouts/NotFound";

const ErrorPage: FC = () => {
  return (
    <>
      <Head>
        <title>Timeplifey - 404 Not Found</title>
      </Head>
      <NotFound />
    </>
  );
};

export default ErrorPage;
