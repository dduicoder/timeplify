import { FC } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import classes from "./Header.module.scss";

const Header: FC = () => {
  const router = useRouter();

  const getAnchorClassName = (link: string) => {
    return router.pathname.startsWith(`/${link}`) ? classes.active : "";
  };

  return (
    <header className={classes.header}>
      <Link href="/">
        <FontAwesomeIcon icon={faClock} />
        <span>Timeplifey</span>
      </Link>
      <nav className={classes.nav}>
        <Link legacyBehavior href="/pomodoro">
          <a className={getAnchorClassName("pomodoro")}>Pomodoro</a>
        </Link>
        <Link legacyBehavior href="/calendar">
          <a className={getAnchorClassName("calendar")}>Calendar</a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
