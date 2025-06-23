import { useState, useEffect, type FC } from "react";
import styled from "styled-components";

const Popup = styled('div')({
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
});

export const locations = ["פיקוד צפון", "פיקוד דרום"];

const UserData: FC = () => {
  const [user, setUser] = useState<string>("");
  const [pikud, setPikud] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  

   useEffect(() => {
    const savedUserData = localStorage.getItem("userData");

    if (savedUserData) {
      const { user, pikud } = JSON.parse(savedUserData);
      setUser(user || "");
      setPikud(pikud || "");
    }
  }, []);

  const handleSubmit = () => {
    const userData = { user, pikud };
    localStorage.setItem("userData", JSON.stringify(userData));

    setShowPopup(false);
  };

  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <div dir="rtl">
      <img width={30} src={`account.png`} alt="Account" onClick={togglePopup} style={{cursor: 'pointer'}}/>

      {showPopup && (
        <Popup>
          <div>
            <h2>פרטי משתמש</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">שם משתמש: </label>
                <input
                  type="text"
                  id="username"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="location">פיקוד </label>
                <select
                  id="location"
                  value={pikud}
                  onChange={(e) => setPikud(e.target.value)}
                  required
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit">שמור</button>
            </form>
            <button onClick={togglePopup}>סגור</button>
          </div>
        </Popup>
      )}
    </div>
  );
};



export default UserData;
