import { useState, useEffect, type FC } from "react";

const popupStyles: React.CSSProperties = {
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
};

const popupContentStyles: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "5px",
  width: "300px",
  textAlign: "center",
};
const UserData: FC = () => {
  const [user, setUser] = useState<string>("");
  const [pikud, setPikud] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const locations = ["צפון", "דרום"];

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
      <img width={30} src={`account.png`} alt="Account" onClick={togglePopup}/>

      {showPopup && (
        <div style={popupStyles}>
          <div style={popupContentStyles}>
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
          </div>
        </div>
      )}
    </div>
  );
};



export default UserData;
