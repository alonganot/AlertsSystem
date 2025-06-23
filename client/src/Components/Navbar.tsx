import { NotificationSettings } from "./NotificationSettings";
import { NotificationDropdown } from "./NotificationsDropdown";
import UserData from "./UserData";

const Navbar: React.FC = () => {
  return (
    <nav
      style={{
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
      }}
    >
      <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", margin: 0, paddingRight: '40px'}}>
        מודל התראות
      </h1>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", direction: "ltr" }}>
        <NotificationSettings />
        <NotificationDropdown />
        <UserData/>
      </div>
    </nav>
  );
};

export default Navbar;
