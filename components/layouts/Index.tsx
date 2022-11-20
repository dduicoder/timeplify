import { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/dist/client/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faUsers,
  faHandshakeSimple,
  faCheck,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./Index.module.css";

const Index: FC = () => {
  const router = useRouter();

  const today = new Date()
    .toLocaleDateString()
    .replaceAll(". ", "-")
    .slice(0, 10);

  const onClick = () => {
    router.push(`/calendar/${today}`);
  };

  return (
    <>
      <section className={classes.first}>
        <h1 className={classes.gradient}>Simplifey your time, Easily</h1>
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
        <span>Learn about us</span>
        <FontAwesomeIcon icon={faChevronDown} />
      </section>
      <section className={classes.second}>
        <div>
          <div className={classes.stats}>
            <div>
              <FontAwesomeIcon icon={faUsers} />
              <span>13 million</span> users
            </div>
            <div>
              <FontAwesomeIcon icon={faHandshakeSimple} />
              <span>1000 meetups</span> per day
            </div>
            <div>
              <FontAwesomeIcon icon={faCheck} />
              Total <span>3 million</span> meetups
            </div>
            <div>
              <FontAwesomeIcon icon={faCircleCheck} />
              93% chance of meeting
            </div>
            <div>
              <FontAwesomeIcon icon={faCircleCheck} />
              Auto matching system
            </div>
            <div>
              <FontAwesomeIcon icon={faCircleCheck} />
              100% free
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
            nostrum. Non architecto quo in modi. Beatae odio similique quod
            consequatur perferendis assumenda neque, earum magni atque ullam
            ipsam autem recusandae.
          </p>
        </div>
      </section>
    </>
  );
};

export default Index;
