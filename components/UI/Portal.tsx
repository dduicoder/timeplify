import { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal: FC<{ query: string; children: ReactNode }> = ({
  query,
  children,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  return mounted
    ? createPortal(children, document.querySelector(query)!)
    : null;
};

export default Portal;
