import { useState, FC } from "react";
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

type PlanItemType = {
  isPast: boolean;
  calendar: CalendarType;
  onDeleteCalendar: (id: string) => void;
};

const PlanItem: FC<PlanItemType> = ({ isPast, calendar, onDeleteCalendar }) => {
  const [show, setShow] = useState<boolean>(true);

  const notice = useNotification();

  const { id, text } = calendar;

  const removeCalendar = () => {
    if (isPast) {
      notice({
        type: "ERROR",
        message: "Cannot remove past events",
      });

      return;
    }

    setShow(false);

    notice({
      type: "SUCCESS",
      message: `Calendar removed! (${text})`,
    });

    setTimeout(() => {
      onDeleteCalendar(id);
    }, 250);
  };

  return (
    <li className={`${classes.item} ${!show ? classes.close : ""}`}>
      <div className={classes.info}>
        <span>{text}</span>
      </div>
      <div className={classes.action}>
        <button onClick={removeCalendar} className="btn">
          <FontAwesomeIcon icon={faX} />
        </button>
        <button className="btn-flat">
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </div>
    </li>
  );
};

export default PlanItem;
