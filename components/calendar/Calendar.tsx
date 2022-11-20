import { gql, useMutation, useQuery } from "@apollo/client";
import { FC, useState } from "react";
import { v4 } from "uuid";

import CalendarItem from "./CalendarItem";
import CalendarModal from "./CalendarModal";

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

const Calendar: FC<{ date: string }> = ({ date }) => {
  const { data: queryData, loading: queryLoading } = useQuery(ALL_CALENDARS);
  const [addCalendar, { loading: addLoading }] = useMutation(ADD_CALENDARS, {
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

  const today = new Date(date);

  return (
    <section>
      <CalendarModal
        show={showModal}
        close={() => setShowModal(false)}
        onAddCalendar={newCalendar}
      />
      <h1>Calendar of {today.toLocaleDateString()}</h1>
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
