import React, { createContext, useContext, useState } from "react";

export interface Notification {
  message: string;
  date: string;
}

interface NotificationsContextValue {
  notifications: Notification[];
  addNotification: (n: Notification) => void;
  removeNotification: (index: number) => void;
}

const NotificationsContext = createContext<NotificationsContextValue | undefined>(undefined);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Notification) => setNotifications((prev) => [...prev, notification]);
  const removeNotification = (index: number) => setNotifications((prev) => prev.filter((_, i) => i !== index));

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used inside a NotificationsProvider");
  return ctx;
};
