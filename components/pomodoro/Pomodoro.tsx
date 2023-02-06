import { FC, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRotateLeft,
  faPlay,
  faPause,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./Pomodoro.module.scss";
import Head from "next/head";

const gradients = [
  ["#fbab7e", "#f7ce68"],
  ["#21d4fd", "#b721ff"],
  ["#8ec5fc", "#e0c3fc"],
  ["#0093e9", "#80d0c7"],
  ["#02343f", "#f0edcc"],
  ["#ff6a88", "#ff99ac"],
  ["#a9c9ff", "#ffbbec"],
  ["#5efce8", "#736efe"],
  ["#50586C", "#DCE2F0"],
];

const Pomodoro: FC = () => {
  const POMODORO_SECONDS = 1500;
  const REST_SECONDS = 300;

  const [isPomodoro, setIsPomodoro] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [intervalID, setIntervalID] = useState<any>();
  const [seconds, setSeconds] = useState<number>(POMODORO_SECONDS);

  const secondsToMinutes = (s: number) =>
    (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;

  const startTimer = () => {
    setIsPlaying(true);

    const interId = setInterval(() => {
      setSeconds((prevData) => {
        if (prevData <= 0) {
          const newSecond = isPomodoro ? REST_SECONDS : POMODORO_SECONDS;

          setIsPlaying(false); //
          clearInterval(interId); // Do I delete these?
          setIsPomodoro(!isPomodoro);

          return newSecond;
        }
        return prevData - 1;
      });
    }, 1000);

    setIntervalID(interId);
  };

  const pauseTimer = () => {
    setIsPlaying(false);
    clearInterval(intervalID);
  };

  const reset = () => {
    pauseTimer();
    setSeconds(isPomodoro ? POMODORO_SECONDS : REST_SECONDS);
  };

  const forwardStep = () => {
    pauseTimer();
    setSeconds(isPomodoro ? REST_SECONDS : POMODORO_SECONDS);
    setIsPomodoro(!isPomodoro);
  };

  const progress =
    (isPomodoro ? seconds / POMODORO_SECONDS : 1 - seconds / REST_SECONDS) *
    100;

  const statusText = isPomodoro ? "focus" : "chill";

  const todaysGradient = gradients[new Date().getDate() % 9];

  console.log();

  return (
    <>
      <Head>
        <title>{`${secondsToMinutes(
          seconds
        )} ${statusText} - Timeplifey`}</title>
      </Head>
      <section className={classes.pomodoro}>
        <h1>Pomodoro</h1>
        <div
          onClick={isPlaying ? pauseTimer : startTimer}
          className={`${classes.clock} ${isPlaying ? "" : classes.break}`}
          style={{
            backgroundImage: `linear-gradient(60deg, ${todaysGradient[0]}, ${todaysGradient[1]})`,
            backgroundPositionX: `${progress}%`,
          }}
        >
          <h1 className={isPlaying ? "" : classes.break}>
            {secondsToMinutes(seconds)}
          </h1>
          <span className={isPlaying ? "" : classes.break}>
            {isPlaying ? statusText : "break"}
          </span>
        </div>
        <div className={classes.action}>
          <FontAwesomeIcon onClick={reset} icon={faRotateLeft} />
          <FontAwesomeIcon
            onClick={isPlaying ? pauseTimer : startTimer}
            icon={isPlaying ? faPause : faPlay}
          />
          <FontAwesomeIcon onClick={forwardStep} icon={faForwardStep} />
        </div>
        <p>
          {isPlaying
            ? isPomodoro
              ? "Time to focus."
              : "Good job!"
            : "Take your time."}
        </p>
      </section>
    </>
  );
};

export default Pomodoro;
