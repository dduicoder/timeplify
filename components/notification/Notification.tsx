import { useState, useEffect, FC, useCallback } from "react";

import classes from "./Notification.module.css";

type NoticeType = {
  id: string;
  type: string;
  message: string;
};

type PropsType = {
  deleteNotification: (id: string) => void;
  note: NoticeType;
};

const Notification: FC<PropsType> = ({ deleteNotification, note }) => {
  const [exit, setExit] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [intervalID, setIntervalID] = useState<any>();

  const { id, type, message } = note;

  const startTimer = () => {
    const interId = setInterval(() => {
      setWidth((prevData) => {
        return prevData + 5;
      });
    }, 150);

    setIntervalID(interId);
  };

  const pauseTimer = () => {
    clearInterval(intervalID);
  };

  const closeNotification = useCallback(() => {
    clearInterval(intervalID);
    setExit(true);

    setTimeout(() => {
      deleteNotification(id);
    }, 250);
  }, [intervalID, deleteNotification, id, setExit]);

  useEffect(() => {
    if (width >= 100) {
      closeNotification();
    }
  }, [width, closeNotification]);

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <div
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
      onClick={closeNotification}
      className={`${classes.notification} ${exit ? classes.close : ""}`}
    >
      {message}
      <div
        className={`${classes.bar} ${
          type === "SUCCESS" ? classes.success : classes.error
        }`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

export default Notification;
