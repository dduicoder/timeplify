import { useState, useEffect, FC, SyntheticEvent } from "react";
import { useNotification } from "../notification/NotificationProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCheck } from "@fortawesome/free-solid-svg-icons";

import classes from "./CalendarItem.module.scss";

type PropsType = {
  isToday: boolean;
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

const getProgressAndMinutes = (
  start: string,
  end: string,
  currentDate: string[]
) => {
  const currentTime = getTime(currentDate, currentDate[2]);
  const startTime = getTime(start.split(":"), "0");
  const endTime = getTime(end.split(":"), "0");

  const totalTime = endTime - startTime;
  const timeCompleted = currentTime - startTime;

  return [Math.floor((timeCompleted / totalTime) * 100), totalTime / 1000 / 60];
};

const CalendarItem: FC<PropsType> = ({
  isToday,
  calendar,
  onDeleteCalendar,
}) => {
  const [show, setShow] = useState<boolean>(true);
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<string[]>(
    new Date().toTimeString().split(" ")[0].split(":")
  );

  const notice = useNotification();

  const { id, title, start, end, description } = calendar;

  const isTimeItem = start !== "";

  if (isTimeItem) {
    useEffect(() => {
      const interval = setInterval(() => {
        const newDate = new Date().toTimeString().split(" ")[0].split(":");
        if (getTime(newDate, newDate[2]) > getTime(end.split(":"), "0")) {
          clearInterval(interval);
        }
        setCurrentDate(newDate);
      }, 60000);

      return () => clearInterval(interval);
    });
  }

  const removeCalendar = (event: SyntheticEvent) => {
    event.stopPropagation();

    notice({
      type: "SUCCESS",
      message: `Calendar removed! (${title})`,
    });

    setShow(false);

    setTimeout(() => {
      onDeleteCalendar(id);
    }, 250);
  };

  const toggleDescription = () => {
    setShowDescription((prevData: boolean) => {
      return !prevData;
    });
  };

  let [progress, minutes] = getProgressAndMinutes(start, end, currentDate);

  if (!isToday) {
    progress = 0;
  }

  return (
    <li className={`${classes.item} ${show ? "" : classes.close}`}>
      <div onClick={toggleDescription} className={classes.wrapper}>
        <div className={classes.info}>
          <span>
            {title} {isTimeItem ? `(${minutes} minutes)` : ""}
          </span>
          <span>{isTimeItem && `${start} ~ ${end}`}</span>
        </div>
        <div className={classes.action}>
          <button onClick={removeCalendar} className="btn-flat">
            <FontAwesomeIcon icon={faX} />
          </button>
          {/* <button className="btn-flat">
          <FontAwesomeIcon icon={faCheck} />
        </button> */}
        </div>
      </div>
      {showDescription && (
        <span className={classes.description}>{description}</span>
      )}
      {isTimeItem && (
        <div className={classes.progress} style={{ width: `${progress}%` }} />
      )}
    </li>
  );
};

export default CalendarItem;
