import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { FC, useState } from "react";
import { v4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import CalendarItem from "./CalendarItem";
import CalendarModal from "./CalendarModal";

import classes from "./Calendar.module.scss";

const GET_DATE = gql`
  query getDate($date: String!) {
    getDate(date: $date) {
      calendars {
        id
        text
        start
        end
      }
    }
  }
`;

const ADD_CALENDAR = gql`
  mutation addCalendar(
    $date: String!
    $id: ID!
    $text: String!
    $start: String!
    $end: String!
  ) {
    addCalendar(date: $date, id: $id, text: $text, start: $start, end: $end) {
      text
    }
  }
`;

const REMOVE_CALENDAR = gql`
  mutation removeCalendar($date: String!, $id: ID!) {
    removeCalendar(date: $date, id: $id)
  }
`;

type CalendarType = {
  id: string;
  text: string;
  start: string;
  end: string;
};

const Calendar: FC<{ date: string }> = ({ date }) => {
  const { data: queryData, loading: queryLoading } = useQuery(GET_DATE, {
    variables: { date },
  });

  const [addCalendar] = useMutation(ADD_CALENDAR, {
    refetchQueries: [
      {
        query: GET_DATE,
        variables: { date },
      },
    ],
  });
  const [removeCalendar] = useMutation(REMOVE_CALENDAR, {
    refetchQueries: [
      {
        query: GET_DATE,
        variables: { date },
      },
    ],
  });

  const [showModal, setShowModal] = useState<boolean>(false);

  if (queryLoading) {
    return <div className="loading-spinner" />;
  }

  const calendars = queryData.getDate.calendars;

  const newCalendar = (data: { text: string; start: string; end: string }) => {
    addCalendar({ variables: { date, id: v4(), ...data } });
  };

  const deleteCalendar = (id: string) => {
    removeCalendar({ variables: { date, id } });
  };

  const getDateLink = (targetDate: number) => {
    const tempDate = new Date(date);
    tempDate.setDate(calendarDate.getDate() + targetDate);
    const text = tempDate.toISOString().slice(0, 10);

    return `/calendar/${text}`;
  };

  const calendarDate = new Date(date);

  const today = new Date();

  const formatter = new Intl.RelativeTimeFormat("en-US", {
    numeric: "auto",
    style: "short",
  });

  const daysPassed = Math.ceil(
    (calendarDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const daysPassedText = formatter.format(daysPassed, "day");

  const isFuture = calendarDate > today;

  return (
    <section>
      <CalendarModal
        show={showModal}
        close={() => setShowModal(false)}
        onAddCalendar={newCalendar}
      />
      <div className={classes.control}>
        <Link href={getDateLink(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h1>
          {calendarDate.toLocaleDateString()} ({daysPassedText})
        </h1>
        <Link href={getDateLink(1)}>
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
      {calendars.length === 0 && (
        <div className={classes.error}>
          <p>- No Calendars{isFuture ? "(future)" : ""} -</p>
        </div>
      )}
      <ul className={classes.list}>
        {calendars.map((item: CalendarType) => (
          <CalendarItem
            key={item.id}
            calendar={item}
            onDeleteCalendar={deleteCalendar}
          />
        ))}
      </ul>
      <div className={classes.action}>
        <button
          className="btn-flat"
          onClick={() => setShowModal(true)}
          disabled={isFuture}
        >
          New Calendar
        </button>
      </div>
    </section>
  );
};

export default Calendar;
