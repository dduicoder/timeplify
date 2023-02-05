import { NextPage } from "next";
import Head from "next/head";

import Pomodoro from "../components/pomodoro/Pomodoro";

const PomodoroPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Timeplifey - Pomodoro</title>
      </Head>
      <Pomodoro />
    </>
  );
};

export default PomodoroPage;
