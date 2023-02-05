import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

import classes from "./Up.module.scss";

const Up = () => {
  const router = useRouter();

  const scrollToTop = () => {
    let wrapper;
    if (router.pathname === "/") {
      wrapper = document.querySelector("main");
    } else {
      wrapper = window;
    }
    wrapper?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <FontAwesomeIcon
      icon={faChevronUp}
      className={classes.up}
      onClick={scrollToTop}
    />
  );
};

export default Up;
