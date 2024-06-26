import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useNotification } from "../notification/NotificationProvider";

import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Backdrop from "../UI/Backdrop";
import Portal from "../UI/Portal";

import classes from "./CalendarModal.module.scss";

type PropsType = {
  initCalendar: CalendarType;
  show: boolean;
  close: () => void;
  onAddCalendar: (data: CalendarType) => void;
  onUpdateCalendar: (data: CalendarType) => void;
};

const CalendarModal = ({
  initCalendar,
  show,
  close,
  onAddCalendar,
  onUpdateCalendar,
}: PropsType) => {
  const ref = useRef<HTMLDivElement>(null);

  const isUpdate = initCalendar.id !== "";

  const [showTime, setShowTime] = useState<boolean>(
    !(isUpdate && initCalendar.start === "")
  );

  const notice = useNotification();

  useEffect(() => {
    setShowTime(!(isUpdate && initCalendar.start === ""));

    window.onkeydown = (event) => {
      if (event.key === "Escape") {
        close();
      }
    };

    return () => {
      window.onkeydown = null;
    };
  }, [setShowTime, close]);

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const formData = new FormData(target);

    const datas: string[] = [];

    for (const data of formData.entries()) {
      datas.push(data[1] as string);
    }

    const [title, start, end, description] = datas;

    let isError = false;
    let errorText = "";

    if (description.trim().length === 0) {
      isError = true;
      errorText = "Please write a description";
    }

    if (showTime && start >= end) {
      isError = true;
      errorText = "Please check your calendar's time";
    }

    if (title.trim().length === 0) {
      isError = true;
      errorText = "Please write a title";
    }

    if (isError) {
      notice({
        type: "ERROR",
        message: errorText,
      });

      return;
    }

    console.log(isUpdate);
    if (isUpdate) {
      onUpdateCalendar({
        id: initCalendar.id,
        title,
        start,
        end,
        description,
      });
    } else {
      onAddCalendar({
        id: crypto.randomUUID(),
        title,
        start,
        end,
        description,
      });
    }
    notice({
      type: "SUCCESS",
      message: isUpdate
        ? `Calendar updated! (${title})`
        : `Calendar made! (${title})`,
    });

    close();
  };

  const checkboxChangeHandler = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;

    setShowTime(target.checked);
  };

  return (
    <>
      <Backdrop show={show} close={() => close()} />
      <Portal query=".overlays">
        <CSSTransition
          nodeRef={ref}
          mountOnEnter
          unmountOnExit
          in={show}
          timeout={250}
          classNames={{
            enterActive: classes.open,
            exitActive: classes.close,
          }}
        >
          <div ref={ref} className={classes.modal}>
            <div className={classes.control}>
              <h1>New Calendar</h1>
              <FontAwesomeIcon icon={faXmark} onClick={() => close()} />
            </div>
            <form onSubmit={submitHandler}>
              <label htmlFor="calendar-title">Title</label>
              <input
                type="title"
                name="title"
                id="calendar-title"
                defaultValue={isUpdate ? initCalendar.title : ""}
                autoFocus
              />
              <label htmlFor="calendar-time">Time</label>
              <input
                type="checkbox"
                id="calendar-time"
                onChange={checkboxChangeHandler}
                checked={showTime}
              />
              <div style={{ display: showTime ? "block" : "none" }}>
                <label htmlFor="calendar-start">Start time</label>
                <input
                  type="time"
                  name="start"
                  id="calendar-start"
                  defaultValue={isUpdate ? initCalendar.start : ""}
                />
                <label htmlFor="calendar-end">End time</label>
                <input
                  type="time"
                  name="end"
                  id="calendar-end"
                  defaultValue={isUpdate ? initCalendar.end : ""}
                />
              </div>
              <label htmlFor="calendar-description">Description</label>
              <textarea
                name="description"
                id="calendar-description"
                rows={5}
                defaultValue={isUpdate ? initCalendar.description : ""}
              ></textarea>
              <div className={classes.action}>
                <button className="btn" type="button" onClick={() => close()}>
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
