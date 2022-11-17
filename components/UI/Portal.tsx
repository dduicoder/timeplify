import { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal: FC<{ children: ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  return mounted
    ? createPortal(children, document.getElementById("overlays")!)
    : null;
};

export default Portal;
