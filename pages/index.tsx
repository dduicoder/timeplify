import { NextPage } from "next";
import Head from "next/head";

import FirstSection from "../components/layouts/Index/FirstSection";
import SecondSection from "../components/layouts/Index/SecondSection";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Timeplify</title>
      </Head>
      <FirstSection />
      <SecondSection />
    </>
  );
};

export default Home;
