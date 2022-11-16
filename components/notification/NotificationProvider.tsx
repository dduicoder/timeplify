import { createContext, FC, ReactNode, useContext, useReducer } from "react";
import { v4 } from "uuid";

import Notification from "./Notification";

import classes from "./NotificationProvider.module.css";

type NoticeType = {
  id: string;
  type: string;
  message: string;
};

const NotificationContext = createContext<NoticeType>({
  id: "",
  type: "",
  message: "",
});

type Action =
  | {
      type: "ADD_NOTIFICATION";
      payload: NoticeType;
    }
  | { type: "REMOVE_NOTIFICATION"; id: string };

const NotificationProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state: NoticeType[], action: Action) => {
      switch (action.type) {
        case "ADD_NOTIFICATION":
          return [...state, { ...action.payload }];
        case "REMOVE_NOTIFICATION":
          return state.filter((el) => el.id !== action.id);
        default:
          return state;
      }
    },
    []
  );

  const deleteNotice = (id: string) => {
    dispatch({
      type: "REMOVE_NOTIFICATION",
      id,
    });
  };

  return (
    <NotificationContext.Provider value={dispatch}>
      <div className={classes.notifications}>
        {state.map((note: NoticeType) => {
          return (
            <Notification
              key={note.id}
              deleteNotice={deleteNotice}
              note={note}
            />
          );
        })}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const dispatch = useContext(NotificationContext);

  return (props: { type: string; message: string }) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: v4(),
        ...props,
      },
    });
  };
};

export default NotificationProvider;
