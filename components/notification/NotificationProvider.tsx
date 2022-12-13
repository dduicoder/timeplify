import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useReducer,
  Dispatch,
} from "react";
import { v4 } from "uuid";

import Portal from "../UI/Portal";
import Notification from "./Notification";

import classes from "./NotificationProvider.module.scss";

type NoticeType = {
  id: string;
  type: string;
  message: string;
};

type ActionType =
  | {
      type: "ADD_NOTIFICATION";
      payload: NoticeType;
    }
  | { type: "REMOVE_NOTIFICATION"; id: string };

const NotificationContext = createContext<Dispatch<ActionType>>(() => null);

const NotificationProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state: NoticeType[], action: ActionType) => {
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

  const deleteNotification = (id: string) => {
    dispatch({
      type: "REMOVE_NOTIFICATION",
      id,
    });
  };

  return (
    <NotificationContext.Provider value={dispatch}>
      <Portal query=".overlays">
        <div className={classes.notifications}>
          {state.map((note: NoticeType) => {
            return (
              <Notification
                key={note.id}
                note={note}
                deleteNotification={deleteNotification}
              />
            );
          })}
        </div>
      </Portal>
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
