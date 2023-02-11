import { FC, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_DATE, ADD_CALENDAR, REMOVE_CALENDAR } from "../../graphql/querys";

import { Calendar as ReactCalendar } from "react-calendar";
import CalendarItem from "./CalendarItem";
import CalendarModal from "./CalendarModal";

import classes from "./Calendar.module.scss";

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

  const newCalendar = (data: CalendarType) => {
    addCalendar({
      variables: { date: dateText, ...data },
    });
  };

  const deleteCalendar = (id: string) => {
    removeCalendar({ variables: { date: dateText, id } });
  };

  const calendarChangeHandler = (newDate: Date) => {
    newDate.setHours(9);
    const newDateText = newDate.toISOString().slice(0, 10);

    setDate(newDate);
    refetch({ date: newDateText });
  };

  const calendars: CalendarType[] = queryData?.getDate.calendars;

  const formatter = new Intl.RelativeTimeFormat("en-US", {
    numeric: "auto",
    style: "short",
  });

  const today = new Date();

  const isToday =
    date.toISOString().slice(0, 10).split("-").join("") ===
    today.toISOString().slice(0, 10).split("-").join("");

  const dayFormatText = formatter.format(
    Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
    "day"
  );

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
        <div style={{ marginTop: "2rem" }} className="loading-spinner" />
      ) : (
        <>
          <h1>{dayFormatText}</h1>
          {calendars.length === 0 ? (
            <p className={classes.error}>- No Calendars -</p>
          ) : (
            <ul className={classes.list}>
              {calendars.map((item: CalendarType) => (
                <CalendarItem
                  key={item.id}
                  isToday={isToday}
                  calendar={item}
                  onDeleteCalendar={deleteCalendar}
                />
              ))}
            </ul>
          )}
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
