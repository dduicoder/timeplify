import { gql, useQuery } from "@apollo/client";
import { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";

import Calendar from "../../components/calendar/Calendar";
import client from "../../graphql/client";

const ALL_DATES = gql`
  query AllDates {
    allDates {
      date
    }
  }
`;

type DateType = {
  date: string;
};

const CalendarPage: NextPage<{
  date: string;
}> = ({ date }) => {
  const titleText = `Timeplifey - ${date}`;

  return (
    <>
      <Head>
        <title>{titleText}</title>
      </Head>
      <Calendar date={date} />
    </>
  );
};

export default CalendarPage;

export const getStaticPaths = async () => {
  // const { data } = await client.query({ query: ALL_DATES });

  const dates: string[] = [];
  let today = new Date();

  for (let i = 0; i <= 10; i++) {
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + i);
    dates.push(targetDate.toISOString().slice(0, 10));
  }

  // console.log(dates);

  return {
    fallback: "blocking",
    paths: dates.map((date) => ({
      params: { calendarDate: date },
    })),
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const date: string = params?.calendarDate?.toString() || "";

  if (isNaN(Date.parse(date))) {
    return {
      props: {
        date: "0",
      },
    };
  }

  return {
    props: {
      date,
    },
  };
};
