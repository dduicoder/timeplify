import { useRouter } from "next/router";
import Link from "next/link";
import { FC } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import classes from "./Header.module.scss";

const Header: FC = () => {
  const router = useRouter();

  const anchorClassName = (link: string) => {
    return router.pathname.startsWith(`/${link}`) ? classes.active : "";
  };

  return (
    <header className={classes.header}>
      <Link href="/">
        <FontAwesomeIcon icon={faClock} />
        <span>Timeplifey</span>
      </Link>
      <nav className={classes.nav}>
        <div className={anchorClassName("pomodoro")}>
          <Link href="/pomodoro">Pomodoro</Link>
        </div>
        <div className={anchorClassName("calendar")}>
          <Link href="/calendar">Calendar</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
