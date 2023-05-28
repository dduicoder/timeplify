import { NextPage } from "next";
import Head from "next/head";

import Chart from "../components/chart/Chart";

const datas = [
  {
    x: 70,
    y: 2,
  },
  {
    x: 20,
    y: 4,
  },
  {
    x: 50,
    y: 15,
  },
  {
    x: 10,
    y: 3,
  },
];

const ChartPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chart - Timeplifey</title>
      </Head>
      <Chart xTotal={100} yTotal={24} datas={datas} />
    </>
  );
};

export default ChartPage;
