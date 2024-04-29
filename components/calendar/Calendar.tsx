import { FC, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_DATE,
  ADD_CALENDAR,
  REMOVE_CALENDAR,
  UPDATE_CALENDAR,
} from "../../graphql/querys";

import { Calendar as ReactCalendar } from "react-calendar";
import CalendarItem from "./CalendarItem";
import CalendarModal from "./CalendarModal";

import classes from "./Calendar.module.scss";

const NULL_CALENDAR = {
  id: "",
  title: "",
  start: "",
  end: "",
  description: "",
};

const Calendar: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [targetCalendar, setTargetCalendar] =
    useState<CalendarType>(NULL_CALENDAR);
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

  const [updateCalendar] = useMutation(UPDATE_CALENDAR, {
    refetchQueries: [
      {
        query: GET_DATE,
        variables: { date: dateText },
      },
    ],
  });

  const addCalendarHandler = (data: CalendarType) => {
    addCalendar({
      variables: { date: dateText, ...data },
    });
  };

  const removeCalendarHandler = (id: string) => {
    removeCalendar({ variables: { date: dateText, id } });
  };

  const updateCalendarHandler = (data: CalendarType) => {
    updateCalendar({
      variables: { date: dateText, ...data },
    });
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
    date.toISOString().slice(0, 10) === today.toISOString().slice(0, 10);

  const dayFormatText = formatter.format(
    Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
    "day"
  );

  return (
    <>
      <CalendarModal
        initCalendar={targetCalendar}
        show={showModal}
        close={() => {
          setShowModal(false);
        }}
        onAddCalendar={addCalendarHandler}
        onUpdateCalendar={updateCalendarHandler}
      />
      <section>
        <ReactCalendar
          onChange={calendarChangeHandler}
          value={date}
          minDetail="year"
        />
      </section>
      <section>
        <h1>{`${dayFormatText} (${date.toLocaleDateString()})`}</h1>
        {loading ? (
          <div style={{ marginTop: "2rem" }} className="loading-spinner" />
        ) : (
          <>
            {calendars.length === 0 && (
              <p className={classes.error}>- No Calendars -</p>
            )}
            <ul className={classes.list}>
              {calendars.map((item: CalendarType) => (
                <CalendarItem
                  key={item.id}
                  isToday={isToday}
                  calendar={item}
                  onUpdateCalendar={() => {
                    setTargetCalendar(
                      calendars.find(
                        (calendar) => calendar.id === item.id
                      ) as CalendarType
                    );
                    setShowModal(true);
                  }}
                  onDeleteCalendar={removeCalendarHandler}
                />
              ))}
            </ul>
          </>
        )}
        <div className={classes.action}>
          <button
            className="btn-flat"
            onClick={() => {
              setTargetCalendar(NULL_CALENDAR);
              setShowModal(true);
            }}
          >
            New Calendar
          </button>
        </div>
      </section>
    </>
  );
};

export default Calendar;
