import { FC, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import classes from "./TodoItem.module.scss";

type PropsType = {
  id: string;
  text: string;
  onRemoveTodo: (id: string) => void;
};

const TodoItem: FC<PropsType> = ({ id, text, onRemoveTodo }) => {
  const [exit, setExit] = useState<boolean>(false);

  const itemRemoveHandler = () => {
    setExit(true);

    setTimeout(() => onRemoveTodo(id), 250);
  };

  return (
    <li key={id} className={`${classes.item} ${exit ? classes.delete : ""}`}>
      {text}
      <FontAwesomeIcon icon={faCheck} onClick={itemRemoveHandler} />
    </li>
  );
};

export default TodoItem;
