import { FC, useEffect, useState } from "react";

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

const POMODORO_SECONDS = 1500;
const REST_SECONDS = 300;
const LONG_REST_SECONDS = 900;

const secondsToMinutes = (s: number) =>
  (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;

const gradients = [
  ["#f7ce68", "#fbab7e"],
  ["#e2b0ff", "#9f44d3"],
  ["#e0c3fc", "#8ec5fc"],
  ["#80d0c7", "#0093e9"],
  ["#90f7ec", "#32ccbc"],
  ["#ff99ac", "#ff6a88"],
  ["#a9c9ff", "#ffbbec"],
  ["#5efce8", "#736efe"],
  ["#dce2f0", "#50586c"],
  ["#fdd819", "#e80505"],
  ["#ee9ae5", "#5994f9"],
  ["#ffd3a5", "#fd6585"],
];

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

  useEffect(() => {
    const item = sessionStorage.getItem("index");

    if (item) {
      const itemIndex: number = JSON.parse(item);
      setIndex(itemIndex);
      setSeconds(steps[itemIndex]);
      setIsPomodoro(itemIndex % 2 === 0);
    }
  }, []);

  const startTimer = () => {
    setIsPlaying(true);

    const interId = setInterval(() => {
      setSeconds((prevData) => {
        if (prevData <= 0) {
          const nextIndex = index < 7 ? index + 1 : 0;

          setIndex(nextIndex);
          sessionStorage.setItem("index", JSON.stringify(nextIndex));
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
    sessionStorage.setItem("index", JSON.stringify(nextIndex));
    setIsPomodoro(!isPomodoro);
  };

  const progress =
    (isPomodoro
      ? seconds / POMODORO_SECONDS
      : 1 - seconds / (index < 7 ? REST_SECONDS : LONG_REST_SECONDS)) * 100;

  const statusText = isPomodoro ? "focus" : "chill";

  const todaysGradient = gradients[new Date().getDate() % 11];

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
