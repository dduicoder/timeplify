import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import classes from "./Header.module.css";

const Header: FC = () => {
  const router = useRouter();

  const anchorClassName = (link: string) => {
    return router.pathname.startsWith(`/${link}`) ? classes.active : "";
  };

  return (
    <header className={classes.header}>
      <Link href="/">Timeplifey</Link>
      <nav className={classes.nav}>
        <div className={anchorClassName("calendar")}>
          <Link href="/calendar">Calendar</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
