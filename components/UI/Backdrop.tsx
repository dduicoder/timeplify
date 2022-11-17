import { FC, useRef } from "react";
import { v4 } from "uuid";

import { CSSTransition } from "react-transition-group";

import Portal from "./Portal";

import classes from "./Backdrop.module.css";

type BackdropProps = {
  show: boolean;
  close: () => void;
};

const Backdrop: FC<BackdropProps> = ({ show, close }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Portal>
      <CSSTransition
        nodeRef={ref}
        mountOnEnter
        unmountOnExit
        in={show}
        timeout={{ enter: 250, exit: 250 }}
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
