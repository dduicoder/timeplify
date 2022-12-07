import { NextPage } from "next";
import Head from "next/head";

import Index from "../components/layouts/Index/Index";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Timeplifey</title>
      </Head>
      <Index />
    </>
  );
};

export default Home;
