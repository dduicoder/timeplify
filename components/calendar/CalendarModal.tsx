import { useNotification } from "../notification/NotificationProvider";

import { CSSTransition } from "react-transition-group";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import Backdrop from "../UI/Backdrop";
import Portal from "../UI/Portal";

import classes from "./CalendarModal.module.css";
import { SyntheticEvent, useRef } from "react";

type calendar = {
  text: string;
  start: string;
  end: string;
};

type CalendarModalProps = {
  show: boolean;
  close: () => void;
  onAddCalendar: (data: calendar) => void;
};

const CalendarModal = ({ show, close, onAddCalendar }: CalendarModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const notice = useNotification();

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const formData = new FormData(target);

    const datas: string[] = [];

    for (const data of formData.entries()) {
      datas.push(data[1] as string);
    }

    const [description, start, end] = datas;

    if (description.trim().length === 0 || start >= end) {
      notice({
        type: "ERROR",
        message:
          description.trim().length === 0
            ? "Please write a description"
            : "Please check your calendar time",
      });

      return;
    }

    onAddCalendar({ text: description, start, end });

    notice({
      type: "SUCCESS",
      message: "Calendar made!",
    });

    close();
  };

  return (
    <>
      <Backdrop show={show} close={close} />
      <Portal>
        <CSSTransition
          nodeRef={ref}
          mountOnEnter
          unmountOnExit
          in={show}
          timeout={{ enter: 250, exit: 250 }}
          classNames={{
            enterActive: classes.open,
            exitActive: classes.close,
          }}
        >
          <div ref={ref} className={classes.modal}>
            <div className={classes.control}>
              <h1>New Calendar</h1>
              <FontAwesomeIcon icon={faXmark} onClick={close} />
            </div>
            <form onSubmit={submitHandler}>
              <label htmlFor="calendar-description">Title</label>
              <input
                type="text"
                name="description"
                id="calendar-description"
                autoFocus
              />
              <label htmlFor="calendar-start">Start time</label>
              <input type="time" name="start" id="calendar-start" />
              <label htmlFor="calendar-end">End time</label>
              <input type="time" name="end" id="calendar-end" />
              <div className={classes.action}>
                <button className="btn" type="button" onClick={close}>
                  Cancel
                </button>
                <button className="btn-flat">Add calendar</button>
              </div>
            </form>
          </div>
        </CSSTransition>
      </Portal>
    </>
  );
};

export default CalendarModal;
