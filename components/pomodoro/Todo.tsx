import { SyntheticEvent, useState } from "react";
import { useNotification } from "../notification/NotificationProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import classes from "./Todo.module.scss";

type Todo = {
  id: string;
  text: string;
};

const Todo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const notice = useNotification();

  const addTodoHandler = (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const text: string = Object.fromEntries(
      new FormData(target)
    ).text.toString();

    if (text.trim().length === 0) {
      notice({ type: "ERROR", message: "Please write a text" });

      return;
    }

    notice({ type: "SUCCESS", message: `New Todo!(${text})` });

    setTodos((prevTodos) => {
      return prevTodos.concat({ id: crypto.randomUUID(), text });
    });
  };

  const removeTodoHandler = (id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  return (
    <section>
      <h1>Todo</h1>
      <form className={classes.form} onSubmit={addTodoHandler}>
        <input type="text" name="text" />
        <button className="btn-flat">Add</button>
      </form>
      <ul className={classes.list}>
        {todos.map((todo) => (
          <li key={todo.id} className={classes.item}>
            {todo.text}
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => removeTodoHandler(todo.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Todo;
