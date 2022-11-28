import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
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

const getDateLink = (date: Date, targetDate: number) => {
  date.setDate(targetDate);
  const text = date.toLocaleDateString().replaceAll(". ", "-").slice(0, 10);

  return `/calendar/${text}`;
};

// 미래 날짜 생성 막기

const Calendar: FC<{ date: string }> = ({ date }) => {
  const router = useRouter();

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

  const toBefore = () => {
    const yesterday = new Date(calendarDate);
    router.push(getDateLink(yesterday, calendarDate.getDate() - 1));
  };

  const toAfter = () => {
    const tomorrow = new Date(calendarDate);
    router.push(getDateLink(tomorrow, calendarDate.getDate() + 1));
  };

  const toToday = () => {
    const today = new Date();
    router.push(getDateLink(today, today.getDate()));
  };

  const calendarDate = new Date(date);

  if (calendarDate > new Date()) {
    return (
      <section>
        <div className={classes.control}>
          <FontAwesomeIcon icon={faArrowLeft} onClick={toBefore} />
          <h1>{calendarDate.toLocaleDateString()}</h1>
          <FontAwesomeIcon icon={faArrowRight} onClick={toAfter} />
        </div>
        <div className={classes.error}>
          <p>No Calendars(future)</p>
          <button className="btn-flat" onClick={toToday}>
            Today
          </button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <CalendarModal
        show={showModal}
        close={() => setShowModal(false)}
        onAddCalendar={newCalendar}
      />
      <div className={classes.control}>
        <FontAwesomeIcon icon={faArrowLeft} onClick={toBefore} />
        <h1>{calendarDate.toLocaleDateString()}</h1>
        <FontAwesomeIcon icon={faArrowRight} onClick={toAfter} />
      </div>
      {calendars.length === 0 && (
        <div className={classes.error}>
          <p>No Calendars</p>
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
        <button className="btn-flat" onClick={() => setShowModal(true)}>
          New Calendar
        </button>
      </div>
    </section>
  );
};

export default Calendar;
