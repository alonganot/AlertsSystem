import styled from "styled-components";
import { useEffect, useState } from "react";
import { NotificationSettings } from "./NotificationSettings";
import { NotificationDropdown } from "./NotificationsDropdown";
import UserData from "./UserData";
import { useSocketEvent } from "src/context/SocketContext";
import type { Notification } from "src/types/Notification";

const Nav = styled('nav')({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  background: "linear-gradient(to right, rgb(48, 144, 161), rgb(15, 96, 110), rgb(9, 19, 54))",
  color: "white",
  padding: "0.75rem 1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  zIndex: 1000,
  direction: "rtl",
  userSelect: 'none'
});

const Navbar: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const addNotification = (notification: Notification) => setNotifications((prev) => [...prev, notification]);
  const removeNotification = (index: number) => setNotifications((prev) => prev.filter((_, i) => i !== index));
  
  useEffect(() => {
      document.title = `מודל התראות${notifications.length > 0 ? ` (${notifications.length})` : ''}`;
  }, [notifications.length]);

  useSocketEvent('kafka-message', (message) => {
    const date = new Intl.DateTimeFormat('en-GB', { //this should come from the message
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date())
          
    addNotification({ message, date })
   
    if (Notification.permission === "granted") {
        new Notification(message);
    }
  })

  return (
    <Nav>
      <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", margin: 0, paddingRight: '40px'}}>
        מודל התראות
      </h1>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", direction: "ltr" }}>
        <NotificationSettings />
        <NotificationDropdown notifications={notifications} removeNotification={removeNotification} />
        <UserData/>
      </div>
    </Nav>
  );
};

export default Navbar;
