import { useState, useEffect, type FC } from "react";
import styled from "styled-components";
import { pikuds } from "../consts";

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

type User = {
  user: string;
  pikud: string;
};

const UserData: FC = () => {
  const [userData, setUserData] = useState<User>();
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");

    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  const handleSubmit = () => {
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
                  value={userData?.user}
                  onChange={(e) => setUserData((prevUser) => {
                      if (prevUser) {
                        return { ...prevUser, user: e.target.value };
                      }
                      return { user: e.target.value, pikud: "" };
                    })}
                  required
                />
              </div>

              <div>
                <label htmlFor="location">פיקוד </label>
                <select
                  id="location"
                  value={userData?.pikud}
                  onChange={(e) => setUserData((prevUser) => {
                      if (prevUser) {
                        return { ...prevUser, pikud: e.target.value };
                      }
                      return { user: "", pikud: e.target.value }; // Initialize if `prevUser` is undefined
                    })
                  }
                  required
                >
                  {pikuds.map((pikud) => (
                    <option key={pikud} value={pikud}>
                      {pikud}
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
