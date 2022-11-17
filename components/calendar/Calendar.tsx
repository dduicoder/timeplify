import { FC, useReducer, useState } from "react";
import { v4 } from "uuid";

import classes from "./Calendar.module.css";

import CalendarItem from "./CalendarItem";
import CalendarModal from "./CalendarModal";

type CalendarType = {
  id: string;
  text: string;
  start: string;
  end: string;
};

type ActionType =
  | {
      type: "ADD_CALENDAR";
      payload: CalendarType;
    }
  | { type: "REMOVE_CALENDAR"; id: string };

const Calendar: FC<{ date: string }> = ({ date }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [calendars, setCalendar] = useReducer(
    (calendars: CalendarType[], action: ActionType) => {
      switch (action.type) {
        case "ADD_CALENDAR":
          return [...calendars, { ...action.payload }];
        case "REMOVE_CALENDAR":
          return calendars.filter((el) => el.id !== action.id);
        default:
          return calendars;
      }
    },
    []
  );

  const addCalendar = (data: { text: string; start: string; end: string }) => {
    setCalendar({
      type: "ADD_CALENDAR",
      payload: {
        id: v4(),
        ...data,
      },
    });
  };

  const deleteCalendar = (id: string) => {
    setCalendar({
      type: "REMOVE_CALENDAR",
      id,
    });
  };

  const today = new Date(date);

  return (
    <section>
      <CalendarModal
        show={showModal}
        close={() => setShowModal(false)}
        onAddCalendar={addCalendar}
      />
      <h1>Calendar of {today.toLocaleDateString()}</h1>
      <ul className={classes.list}>
        {calendars.map((item: CalendarType, i: number) => (
          <CalendarItem
            key={i}
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
