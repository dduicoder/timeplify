import Head from "next/head";
import { FC } from "react";
import CalendarHome from "../../components/calendar/Index";

const CalendarHomePage: FC = () => {
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
