import { useState, FC, useEffect, useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

import classes from "./Index.module.scss";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";

const Index: FC = () => {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);

  const onIntersect: IntersectionObserverCallback = useCallback((event) => {
    if (event[0].isIntersecting) {
      event[0].target.classList.add(classes.show);
    }
  }, []);

  useEffect(() => {
    if (!target) return;

    const observer: IntersectionObserver = new IntersectionObserver(
      onIntersect
    );
    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [onIntersect, target]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <FirstSection />
      <SecondSection refFunc={setTarget} />
      <FontAwesomeIcon
        icon={faChevronUp}
        className={classes.up}
        onClick={scrollToTop}
      />
    </>
  );
};

export default Index;
