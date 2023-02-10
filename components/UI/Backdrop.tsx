import { FC, useRef } from "react";

import { CSSTransition } from "react-transition-group";
import Portal from "./Portal";

import classes from "./Backdrop.module.scss";

type PropsType = {
  show: boolean;
  close: () => void;
};

const Backdrop: FC<PropsType> = ({ show, close }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Portal query=".overlays">
      <CSSTransition
        nodeRef={ref}
        mountOnEnter
        unmountOnExit
        in={show}
        timeout={250}
        classNames={{
          enterActive: classes.open,
          exitActive: classes.close,
        }}
      >
        <div ref={ref} className={classes.backdrop} onClick={close} />
      </CSSTransition>
    </Portal>
  );
};

export default Backdrop;
