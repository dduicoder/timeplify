import { useState, useEffect, FC } from "react";

import classes from "./Notification.module.css";

type NoticeType = {
  id: string;
  type: string;
  message: string;
};

type NotificationProps = {
  deleteNotice: (id: string) => void;
  note: NoticeType;
};

const Notification: FC<NotificationProps> = ({ deleteNotice, note }) => {
  const [exit, setExit] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [intervalID, setIntervalID] = useState<any>();

  const { id, type, message } = note;

  const startTimer = () => {
    const interId = setInterval(() => {
      setWidth((prevData) => {
        return prevData + 5;
      });
    }, 200);

    // console.log(interId);

    setIntervalID(interId);
  };

  const pauseTimer = () => {
    // console.log(intervalID);
    clearInterval(intervalID);
  };

  const closeNotification = () => {
    pauseTimer();
    setExit(true);

    setTimeout(() => {
      deleteNotice(id);
    }, 250);
  };

  useEffect(() => {
    if (width >= 100) {
      closeNotification();
    }
  }, [width]);

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
