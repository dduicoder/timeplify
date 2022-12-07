import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

import classes from "./Index.module.scss";

const ALL_DATES = gql`
  query AllDates {
    allDates {
      date
      calendars {
        id
        text
      }
    }
  }
`;

type CalendarType = {
  id: string;
  text: string;
};

type DateType = {
  date: string;
  calendars: CalendarType[];
};

const CalendarHome: FC = () => {
  const router = useRouter();

  const { data, loading, refetch } = useQuery(ALL_DATES);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return <div className="loading-spinner" />;
  }

  const today = new Date().toISOString().slice(0, 10);

  const onClick = () => {
    router.push(`/calendar/${today}`);
  };

  const dates: DateType[] = data.allDates;

  return (
    <section className={classes.section}>
      <h1>Calendars</h1>
      <div className={classes.dates}>
        {dates.map((date: DateType) => (
          <Link key={date.date} href={`/calendar/${date.date}`}>
            {date.date}
            {date.calendars.map((calendar) => (
              <div key={calendar.id}>{calendar.text}</div>
            ))}
          </Link>
        ))}
      </div>
      <div className={classes.action}>
        <button className="btn-flat" onClick={onClick}>
          Today&apos;s Calendar
        </button>
      </div>
    </section>
  );
};

export default CalendarHome;
