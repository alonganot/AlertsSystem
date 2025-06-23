import { useState, useEffect, type FC } from "react";
import styled from "styled-components";

const Popup = styled('div')({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: 'black',
});

const PopupContent = styled('div')({
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "5px",
  width: "300px",
  textAlign: "center"
});

export const locations = ["פיקוד צפון", "פיקוד דרום"];

const UserData: FC = () => {
  const [user, setUser] = useState<string>("");
  const [pikud, setPikud] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  

  useEffect(() => {
    setUser(localStorage.getItem("user") || '');
    setPikud(localStorage.getItem("pikud") || '');
  }, []);

  const handleSubmit = () => {  
    localStorage.setItem("user", user);
    localStorage.setItem("pikud", pikud);
    
    setShowPopup(false);
  };

  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <div dir="rtl">
      <img width={30} src={`account.png`} alt="Account" onClick={togglePopup} style={{cursor: 'pointer'}}/>

      {showPopup && (
        <Popup>
          <PopupContent>
            <h2>פרטי משתמש</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">שם משתמש </label>
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
          </PopupContent>
        </Popup>
      )}
    </div>
  );
};



export default UserData;
