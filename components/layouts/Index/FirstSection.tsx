import Link from "next/link";
import { FC } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import classes from "./FirstSection.module.scss";
import { useRouter } from "next/router";

const FirstSection: FC = () => {
  const router = useRouter();

  const today = new Date().toISOString().slice(0, 10);

  const onClick = () => {
    router.push(`/calendar/${today}`);
  };

  const onScroll = () => {
    const secondSection = document.querySelectorAll("#__next section")[1];

    if (secondSection) {
      secondSection.scrollIntoView();
    }
  };

  return (
    <section className={classes.first}>
      <div>
        <h1>Simplifey your time, Easily</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
          nesciunt quaerat libero debitis adipisci, totam doloremque aspernatur
          iure repellendus odit dignissimos commodi facere ab beatae temporibus
          deleniti reprehenderit officiis consectetur!
        </p>
        <div className={classes.action}>
          <Link href="/calendar">
            <button className="btn">All Calendars</button>
          </Link>
          <button className="btn-flat" onClick={onClick}>
            Todays Calendar
          </button>
        </div>
        <span>Learn about Timeplifey</span>
        <FontAwesomeIcon icon={faChevronDown} onClick={onScroll} />
      </div>
    </section>
  );
};

export default FirstSection;
