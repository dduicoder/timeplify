import { FC, useState } from "react";

import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faRotateLeft,
  faPlay,
  faPause,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./Pomodoro.module.scss";

const gradients = [
  ["#f7ce68", "#fbab7e"],
  ["#21d4fd", "#b721ff"],
  ["#8ec5fc", "#e0c3fc"],
  ["#0093e9", "#80d0c7"],
  ["#02343f", "#f0edcc"],
  ["#ff6a88", "#ff99ac"],
  ["#a9c9ff", "#ffbbec"],
  ["#5efce8", "#736efe"],
  ["#dce2f0", "#50586c"],
];

const POMODORO_SECONDS = 1500;
const REST_SECONDS = 300;
const LONG_REST_SECONDS = 900;

const steps = [
  POMODORO_SECONDS,
  REST_SECONDS,
  POMODORO_SECONDS,
  REST_SECONDS,
  POMODORO_SECONDS,
  REST_SECONDS,
  POMODORO_SECONDS,
  LONG_REST_SECONDS,
];

const Pomodoro: FC = () => {
  const [isPomodoro, setIsPomodoro] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [intervalID, setIntervalID] = useState<any>();
  const [index, setIndex] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(steps[index]);

  const secondsToMinutes = (s: number) =>
    (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;

  const startTimer = () => {
    setIsPlaying(true);

    const interId = setInterval(() => {
      setSeconds((prevData) => {
        if (prevData <= 0) {
          const nextIndex = index < 7 ? index + 1 : 0;

          setIndex(nextIndex);
          setIsPlaying(false); //
          clearInterval(interId); // Do I delete these?
          setIsPomodoro(!isPomodoro);

          return steps[nextIndex];
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
    setSeconds(steps[index]);
  };

  const nextStep = () => {
    const nextIndex = index < 7 ? index + 1 : 0;

    pauseTimer();
    setSeconds(steps[nextIndex]);
    setIndex(nextIndex);
    setIsPomodoro(!isPomodoro);
  };

  const progress =
    (isPomodoro
      ? seconds / POMODORO_SECONDS
      : 1 - seconds / (index < 7 ? REST_SECONDS : LONG_REST_SECONDS)) * 100;

  const statusText = isPomodoro ? "focus" : "chill";

  const todaysGradient = gradients[new Date().getDate() % 9];

  return (
    <>
      <Head>
        <title>{`${secondsToMinutes(
          seconds
        )} ${statusText} - Timeplifey`}</title>
      </Head>
      <section className={classes.pomodoro}>
        <div className={classes.control}>
          <h1>{`Pomodoro(step ${index + 1})`}</h1>
          <div>
            <FontAwesomeIcon icon={faCircleInfo} />
          </div>
        </div>
        <div
          onClick={isPlaying ? pauseTimer : startTimer}
          className={`${classes.clock} ${isPlaying ? "" : classes.break}`}
          style={{
            backgroundImage: `linear-gradient(60deg, ${todaysGradient[0]}, ${todaysGradient[1]})`,
            backgroundPositionX: `${progress}%`,
          }}
        >
          <h1>{secondsToMinutes(seconds)}</h1>
          <span>{isPlaying ? statusText : "break"}</span>
        </div>
        <div className={classes.action}>
          <FontAwesomeIcon onClick={reset} icon={faRotateLeft} />
          <FontAwesomeIcon
            onClick={isPlaying ? pauseTimer : startTimer}
            icon={isPlaying ? faPause : faPlay}
          />
          <FontAwesomeIcon onClick={nextStep} icon={faForwardStep} />
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
