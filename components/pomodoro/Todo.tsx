import { SyntheticEvent, useState } from "react";
import { useNotification } from "../notification/NotificationProvider";

import TodoItem from "./TodoItem";

import classes from "./Todo.module.scss";

type Todo = {
  id: string;
  text: string;
};

const Todo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>("");

  const notice = useNotification();

  const addTodoHandler = (event: SyntheticEvent) => {
    event.preventDefault();

    if (inputText.trim().length === 0) {
      notice({ type: "ERROR", message: "Please write a text" });

      return;
    }

    notice({ type: "SUCCESS", message: `New Todo!(${inputText})` });

    setTodos((prevTodos) => {
      return prevTodos.concat({ id: crypto.randomUUID(), text: inputText });
    });

    setInputText("");
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
        <input
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />
        <button className="btn-flat">Add</button>
      </form>
      <ul className={classes.list}>
        {todos.length === 0 && <p>Nothing To Do...</p>}
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            onRemoveTodo={removeTodoHandler}
          />
        ))}
      </ul>
    </section>
  );
};

export default Todo;
