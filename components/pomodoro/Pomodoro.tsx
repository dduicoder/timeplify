import { FC, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRotateLeft,
  faPlay,
  faPause,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./Pomodoro.module.scss";

const Pomodoro: FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [intervalID, setIntervalID] = useState<any>();
  const [seconds, setSeconds] = useState<number>(1500);

  const fmtMSS = (s: number) => (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;

  const startTimer = () => {
    setIsPlaying(true);
    const interId = setInterval(() => {
      setSeconds((prevData) => {
        return prevData - 1;
      });
    }, 1000);

    setIntervalID(interId);
  };

  const pauseTimer = () => {
    setIsPlaying(false);
    clearInterval(intervalID);
  };

  return (
    <section className={classes.pomodoro}>
      <h1>Pomodoro</h1>
      <div className={classes.clock}>
        <h1>{fmtMSS(seconds)}</h1>
        <span>FOCUS</span>
      </div>
      <div className={classes.action}>
        <FontAwesomeIcon
          onClick={() => {
            setSeconds(1500);
            pauseTimer();
          }}
          icon={faRotateLeft}
        />
        <FontAwesomeIcon
          onClick={isPlaying ? pauseTimer : startTimer}
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon icon={faForwardStep} />
      </div>
    </section>
  );
};

export default Pomodoro;
