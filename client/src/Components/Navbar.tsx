import { useState } from "react";
import { useNotifications } from "../context/NotificationsContext";

const Navbar: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "linear-gradient(to right,rgb(48, 144, 161),rgb(15, 96, 110),rgb(9, 19, 54))",
        color: "white",
        padding: "0.75rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        zIndex: 1000
    }}
    >
      <div
        style={{ position: "relative", cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      >
        <img width={30} src={`../../../public/bell${notifications.length > 0? 'alert' : 'silent'}.png`}></img>
        {notifications.length > 0 && (
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
        )}
      </div>
       <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", textAlign: "right", marginRight: "50px" }}>
        מודל התראות
       </h1>

      {/* Floating list */}
      {open && notifications.length > 0 && (
        <div
          style={{
            position: "absolute",
            left: "1rem",
            top: "3.5rem",
            background: "white",
            color: "black",
            width: "16rem",
            borderRadius: "0.5rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
            padding: "0.5rem",
            zIndex: 10,
          }}
        >
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
          <ul style={{ listStyle: "none", padding: 0, margin: 0, maxHeight: "16rem", overflowY: "auto" }}>
            {notifications.map((notification, index) => (
              <li
                key={index}
                style={{
                  padding: "0.5rem",
                  backgroundColor: "#eff6ff",
                  borderRadius: "0.25rem",
                  marginBottom: "0.25rem",
                  cursor: "pointer",
                }}
                title="Click to dismiss"
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#dbeafe")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#eff6ff")}
                onClick={() => removeNotification(index)}
              >
                <div style={{ fontSize: "0.875rem" }}>{notification.message}</div>
                <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>{notification.date}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
