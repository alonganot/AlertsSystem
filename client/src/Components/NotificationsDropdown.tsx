import { useEffect, useState } from "react";
import styled from "styled-components";
import type { Notification } from 'src/types/Notification';
import { useSocketEvent } from "src/context/SocketContext";

const AlertsNum = styled('span')({
  position: "absolute",
  top: "-4px",
  right: "-8px",
  backgroundColor: "rgb(9, 19, 54)",
  color: "white",
  borderRadius: "50%",
  width: "20px",
  height: "20px",
  fontSize: "0.75rem",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const AlertsBox = styled('div')({
  position: "absolute",
  top: "2.5rem",
  background: "white",
  color: "black",
  width: "16rem",
  borderRadius: "0.5rem",
  boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
  padding: "0.5rem",
  zIndex: 10,
});

const Title = styled('h2')({
  fontWeight: "600",
  borderBottom: "1px solid #e5e7eb",
  paddingBottom: "0.25rem",
  marginBottom: "0.25rem",
  marginTop: "0",
  textAlign: "center",
});

const AlertsList = styled('ul')({
  listStyle: "none",
  padding: 0,
  margin: 0,
  maxHeight: "16rem",
  overflowY: "auto",
});

const Alert = styled('li')({
  padding: "0.5rem",
  backgroundColor: "#eff6ff",
  borderRadius: "0.25rem",
  marginBottom: "0.25rem",
  cursor: "pointer",
  textAlign: 'right'
});

const NotificationDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
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
    <div style={{ position: "relative", cursor: "pointer" }}>
        <img
            width={30}
            src={`bell${notifications.length > 0 ? "alert" : "silent"}.png`}
            alt="Bell"
            onClick={() => setOpen(!open)}
        />
        { notifications.length > 0 && 
        <>
            <AlertsNum>
              {notifications.length}
            </AlertsNum>
            { open &&
              <AlertsBox>
                <Title>
                  התראות
                </Title>
                <AlertsList>
                  { notifications.map((notification, index) => (
                    <Alert
                    key={index}
                    title="לחצו להסרה"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#dbeafe")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#eff6ff")}
                    onClick={() => removeNotification(index)}
                    >
                      <div style={{ fontSize: "0.875rem" }}>{notification.message}</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>{notification.date}</div>
                    </Alert>
                  ))}
                </AlertsList>
              </AlertsBox>
            }
        </>
        }
    </div>
)}

export { NotificationDropdown };
