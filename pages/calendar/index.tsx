import { NextPage } from "next";
import Head from "next/head";

import CalendarHome from "../../components/calendar/Index";

const CalendarHomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Timeplifey - Calendars</title>
      </Head>
      <CalendarHome />
    </>
  );
};

export default CalendarHomePage;
