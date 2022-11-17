import { useState, useEffect, FC, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCheck } from "@fortawesome/free-solid-svg-icons";

import classes from "./CalendarItem.module.css";

type CalendarType = {
  id: string;
  text: string;
  start: string;
  end: string;
};

type CalendarItemType = {
  calendar: CalendarType;
  onDeleteCalendar: (id: string) => void;
};

const getTime = (date: string[], sec: string) => {
  return new Date(
    2023,
    1,
    1,
    parseInt(date[0]),
    parseInt(date[1]),
    parseInt(sec)
  ).getTime();
};

const CalendarItem: FC<CalendarItemType> = ({ calendar, onDeleteCalendar }) => {
  const ref = useRef(null);
  const [show, setShow] = useState(true);
  const [currentDate, setCurrentDate] = useState<string[]>(
    new Date().toTimeString().split(" ")[0].split(":")
  );

  const { id, text, start, end } = calendar;

  const removeCalendar = () => {
    setShow(false);

    const timeId = setTimeout(() => {
      onDeleteCalendar(id);
    }, 250);

    clearTimeout(timeId);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date().toTimeString().split(" ")[0].split(":"));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const startTimes = start.split(":");
  const endTimes = end.split(":");

  const currentTime = getTime(currentDate, currentDate[2]);
  const startTime = getTime(startTimes, "0");
  const endTime = getTime(endTimes, "0");

  const timeSum = endTime - startTime;
  const timeCompleted = currentTime - startTime;

  const progress = Math.floor((timeCompleted / timeSum) * 100);

  return (
    <CSSTransition
      nodeRef={ref}
      mountOnEnter
      unmountOnExit
      in={show}
      timeout={{ exit: 250 }}
      classNames={{
        exitActive: classes.close,
      }}
    >
      <li className={classes.item} ref={ref}>
        <div className={classes.info}>
          <span>{text}</span>
          <span>
            {start} ~ {end}
          </span>
        </div>
        <div className={classes.action}>
          <button onClick={removeCalendar} className="btn">
            <FontAwesomeIcon icon={faX} />
          </button>
          <button className="btn-flat">
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
        <div className={classes.progress} style={{ width: `${progress}%` }} />
      </li>
    </CSSTransition>
  );
};

export default CalendarItem;
