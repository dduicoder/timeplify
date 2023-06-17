import { useEffect, useRef } from "react";

import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Backdrop from "../UI/Backdrop";
import Portal from "../UI/Portal";

import classes from "./PomodoroModal.module.scss";

type PropsType = {
  show: boolean;
  close: () => void;
};

const PomodoroModal = ({ show, close }: PropsType) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.onkeydown = (event) => {
      if (event.key === "Escape") {
        close();
      }
    };

    return () => {
      window.onkeydown = null;
    };
  }, [close]);

  return (
    <>
      <Backdrop show={show} close={close} />
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
            <header>
              <h1>Pomodoro Technique</h1>
              <FontAwesomeIcon icon={faXmark} onClick={close} />
            </header>
            <section>
              <h3>What is the Pomodoro Technique?</h3>
              <p>
                The Pomodoro Technique is a well-known time management method.
                Here&apos;s how it works.
              </p>
              <ol>
                <li>
                  Set a Timer: Choose a task to work on and turn on the
                  25-minute timer.
                </li>
                <li>
                  Work Intensely: Concentrate on your task with dedication.
                  Avoid multitasking and work efficiently for 25 minutes. Also,
                  don&apos;t forget that there&apos;s an upcoming break.
                </li>
                <li>
                  Take a Short Break: After the 25-minute Pomodoro, take a short
                  break for 5 minutes. While this break, you can recharge your
                  energy before the next Pomodoro.
                </li>
                <li>
                  Repeat and Track: Repeat this process four times. After four
                  consecutive Pomodoros, take a longer break for 15 minutes.
                </li>
              </ol>
            </section>
            <section>
              <h3>Why is the Pomodoro Technique effective?</h3>
              <ol>
                <li>
                  Timeboxing: Pomodoro sets a specific time limit for your task.
                  By breaking your work into manageable intervals, it maintains
                  your focus throughout each Pomodoro.
                </li>
                <li>
                  Focus and Concentration: Knowing that you have a limited time
                  frame for each Pomodoro helps you concentrate solely on the
                  task. This reduces distractions and encourages productivity.
                </li>
                <li>
                  Regular Breaks: Pomodoro knows the importance of taking
                  breaks. Short breaks between Pomodoros allow you to rest and
                  remain sharp mentaly. Long breaks after four Pomodoros provide
                  a more substantial recovery period.
                </li>
                <li>
                  Time Awareness: Pomodoro helps your ability to utilize time.
                  By tracking your Pomodoros, you gain insights about your time
                  management, and you can adjust your approach accordingly.
                </li>
              </ol>
            </section>
            <section>
              <h3>What kind of people should use the Pomodoro Technique?</h3>
              <ol>
                <li>
                  Students: Pomodoro helps students stay focused during study
                  sessions, manage their time effectively, and avoid burnout
                  while preparing for exams or completing assignments.
                </li>
                <li>
                  Professionals: Individuals in various fields can use the
                  Pomodoro Technique to enhance their work efficiency, maintain
                  concentration.
                </li>
                <li>
                  Freelancers and Remote Workers: People who work independently
                  often face challenges with time management. Pomodoro provides
                  an approach to maintain focus and maximize productivity.
                </li>
                <li>
                  Procrastinators: Those who struggle with procrastination can
                  benefit from Pomodoro&apos;s break intervals and time limits,
                  which helps breaking task to a manageable form.
                </li>
                <li>
                  Anyone Seeking Focus: Pomodoro can be helpful for anyone
                  looking to improve their ability to concentrate, minimize
                  distractions, and work more efficiently.
                </li>
              </ol>
            </section>
          </div>
        </CSSTransition>
      </Portal>
    </>
  );
};

export default PomodoroModal;
