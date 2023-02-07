import { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type PropsType = { query: string; children: ReactNode };

const Portal: FC<PropsType> = ({ query, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  return mounted
    ? createPortal(children, document.querySelector(query)!)
    : null;
};

export default Portal;
