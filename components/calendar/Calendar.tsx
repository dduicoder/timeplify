import { gql, useMutation, useQuery } from "@apollo/client";
import { FC, useState } from "react";

import { Calendar as ReactCalendar } from "react-calendar";

import TimeItem from "./CalendarItems/TimeItem";
import PlanItem from "./CalendarItems/PlanItem";
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

const Calendar: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  const dateText = date.toISOString().slice(0, 10);

  const {
    data: queryData,
    loading,
    refetch,
  } = useQuery(GET_DATE, {
    variables: { date: dateText },
  });

  const [addCalendar] = useMutation(ADD_CALENDAR, {
    refetchQueries: [
      {
        query: GET_DATE,
        variables: { date: dateText },
      },
    ],
  });

  const [removeCalendar] = useMutation(REMOVE_CALENDAR, {
    refetchQueries: [
      {
        query: GET_DATE,
        variables: { date: dateText },
      },
    ],
  });

  const calendars = queryData?.getDate.calendars;

  const newCalendar = (data: { text: string; start: string; end: string }) => {
    addCalendar({
      variables: { date: dateText, id: crypto.randomUUID(), ...data },
    });
  };

  const deleteCalendar = (id: string) => {
    removeCalendar({ variables: { date: dateText, id } });
  };

  const today = new Date();

  const formatter = new Intl.RelativeTimeFormat("en-US", {
    numeric: "auto",
    style: "short",
  });

  const daysPassed = Math.ceil(
    (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const daysPassedText = formatter.format(daysPassed, "day");

  const calendarChangeHandler = (newDate: Date) => {
    newDate.setHours(9);
    const newDateText = newDate.toISOString().slice(0, 10);

    setDate(newDate);
    refetch({ date: newDateText });
  };

  return (
    <section>
      <CalendarModal
        show={showModal}
        close={() => setShowModal(false)}
        onAddCalendar={newCalendar}
      />
      <ReactCalendar
        onChange={calendarChangeHandler}
        value={date}
        minDetail="year"
      />
      {loading ? (
        <div className="loading-spinner" />
      ) : (
        <>
          <h1>{daysPassedText}</h1>
          {calendars?.length === 0 && (
            <div className={classes.error}>
              <p>- No Calendars -</p>
            </div>
          )}
          <ul className={classes.list}>
            {calendars?.map((item: CalendarType) =>
              item.start === "" ? (
                <PlanItem
                  key={item.id}
                  calendar={item}
                  onDeleteCalendar={deleteCalendar}
                />
              ) : (
                <TimeItem
                  key={item.id}
                  calendar={item}
                  onDeleteCalendar={deleteCalendar}
                />
              )
            )}
          </ul>
        </>
      )}
      <div className={classes.action}>
        <button className="btn-flat" onClick={() => setShowModal(true)}>
          New Calendar
        </button>
      </div>
    </section>
  );
};

export default Calendar;
