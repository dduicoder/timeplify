import { gql, useMutation, useQuery } from "@apollo/client";
import { FC, useState } from "react";
import { useRouter } from "next/router";
import { v4 } from "uuid";

import CalendarItem from "./CalendarItem";
import CalendarModal from "./CalendarModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import classes from "./Calendar.module.css";

const ALL_CALENDARS = gql`
  query allCalendars {
    allCalendars {
      id
      text
      start
      end
    }
  }
`;

const ADD_CALENDARS = gql`
  mutation addCalendar(
    $id: ID!
    $text: String!
    $start: String!
    $end: String!
  ) {
    addCalendar(id: $id, text: $text, start: $start, end: $end) {
      id
    }
  }
`;

const REMOVE_CALENDARS = gql`
  mutation removeCalendar($id: ID!) {
    removeCalendar(id: $id)
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

const Calendar: FC<{ date: string }> = ({ date }) => {
  const router = useRouter();

  const { data: queryData, loading: queryLoading } = useQuery(ALL_CALENDARS);
  const [addCalendar] = useMutation(ADD_CALENDARS, {
    refetchQueries: [{ query: ALL_CALENDARS }, "allCalendars"],
  });
  const [removeCalendar] = useMutation(REMOVE_CALENDARS, {
    refetchQueries: [{ query: ALL_CALENDARS }, "allCalendars"],
  });

  const [showModal, setShowModal] = useState<boolean>(false);

  if (queryLoading) {
    return <div className="loading-spinner" />;
  }

  const calendars = queryData.allCalendars;

  const newCalendar = (data: { text: string; start: string; end: string }) => {
    addCalendar({ variables: { id: v4(), ...data } });
  };

  const deleteCalendar = (id: string) => {
    removeCalendar({ variables: { id } });
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
          <p>No Calendar(future)</p>
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
      {!calendars && (
        <div className={classes.error}>
          <p>daf</p>
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
