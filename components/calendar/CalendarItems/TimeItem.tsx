import { useState, useEffect, FC } from "react";
import { useNotification } from "../../notification/NotificationProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCheck } from "@fortawesome/free-solid-svg-icons";

import classes from "./CalendarItems.module.scss";

type CalendarType = {
  id: string;
  text: string;
  start: string;
  end: string;
};

type TimeItemType = {
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

const TimeItem: FC<TimeItemType> = ({ calendar, onDeleteCalendar }) => {
  const [show, setShow] = useState<boolean>(true);
  const [currentDate, setCurrentDate] = useState<string[]>(
    new Date().toTimeString().split(" ")[0].split(":")
  );

  const notice = useNotification();

  const { id, text, start, end } = calendar;

  const removeCalendar = () => {
    setShow(false);

    notice({
      type: "SUCCESS",
      message: `Calendar removed! (${text})`,
    });

    setTimeout(() => {
      onDeleteCalendar(id);
    }, 250);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newDate = new Date().toTimeString().split(" ")[0].split(":");
      if (getTime(newDate, newDate[2]) > endTime) {
        clearInterval(interval);
      }
      setCurrentDate(newDate);
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

  const minutes = timeSum / 1000 / 60;

  return (
    <li className={`${classes.item} ${!show ? classes.close : ""}`}>
      <div className={classes.info}>
        <span>
          {text} ({minutes} minutes)
        </span>
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
  );
};

export default TimeItem;
