import { NextPage } from "next";
import Head from "next/head";

import Calendar from "../components/calendar/Calendar";

const CalendarPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Calendar - Timeplify</title>
      </Head>
      <Calendar />
    </>
  );
};

export default CalendarPage;
