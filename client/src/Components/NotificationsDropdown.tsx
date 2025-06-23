import { useState } from "react";
import { useNotifications } from "../context/NotificationsContext";

const NotificationDropdown: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();
  const [open, setOpen] = useState(false);

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
            <span
              style={{
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
              }}
              >
              {notifications.length}
            </span>
            { open &&
              <div
              style={{
                position: "absolute",
                top: "2.5rem",
                background: "white",
                color: "black",
                width: "16rem",
                borderRadius: "0.5rem",
                boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                padding: "0.5rem",
                zIndex: 10,
              }}>
                <h2
                  style={{
                    fontWeight: "600",
                    borderBottom: "1px solid #e5e7eb",
                    paddingBottom: "0.25rem",
                    marginBottom: "0.25rem",
                    marginTop: "0",
                    textAlign: "center",
                  }}
                  >
                  התראות
                </h2>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    maxHeight: "16rem",
                    overflowY: "auto",
                  }}
                  >
                  { notifications.map((notification, index) => (
                    <li
                    key={index}
                    style={{
                      padding: "0.5rem",
                      backgroundColor: "#eff6ff",
                      borderRadius: "0.25rem",
                      marginBottom: "0.25rem",
                      cursor: "pointer",
                      textAlign: 'right'
                    }}
                    title="Click to dismiss"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#dbeafe")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#eff6ff")}
                    onClick={() => removeNotification(index)}
                    >
                      <div style={{ fontSize: "0.875rem" }}>{notification.message}</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>{notification.date}</div>
                    </li>
                  ))}
                </ul>
              </div>
            }
        </>
        }
    </div>
)}

export { NotificationDropdown };
