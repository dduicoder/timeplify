import Head from "next/head";
import { FC } from "react";
import Index from "../components/layouts/Index";

const Home: FC = () => {
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
