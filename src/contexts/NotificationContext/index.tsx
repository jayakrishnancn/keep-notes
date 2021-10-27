import { createContext, useContext, useState } from "react";
import { Notification, NotificationMessage } from "./type";

const NotificationContext = createContext<Notification>({
  data: {
    date: null,
    message: null,
  },
  setMessage: () => {},
});

export const NotificationProvider = (props: any) => {
  const [message, setMessage] = useState<NotificationMessage | null>(null);
  const addMessage = (message: string) =>
    setMessage({
      message,
      date: new Date(),
    });
  return (
    <NotificationContext.Provider
      {...props}
      value={{
        data: message,
        setMessage: addMessage,
      }}
    />
  );
};

export const useNotification = () => useContext(NotificationContext);
