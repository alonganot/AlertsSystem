import { useEffect, useState, type FC } from "react";
import { sendEvent } from "../api/Events";
import { locations } from "./UserData";

const events = ["קו נכנס לתוקף", "קו יצא מתוקף", "קו נמחק"];

export const EventSender: FC = () => {
    const [selectedEvent, setSelectedEvent] = useState<string>(events[0]);    
    const [selectedPikud, setSelectedPikud] = useState<string>(locations[0]);    

    useEffect(() => {
        if ("Notification" in window && Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    }, []);

    return (
       <div style={{ display: "flex", flexDirection: "row-reverse", gap: "2rem", alignItems: "center" }}>
            <h2>:בחר אירוע</h2>
            <div>
                <button
                    onClick={() => sendEvent(selectedEvent)}
                    style={{
                        padding: "0.5rem 1rem",
                        height: "2.5rem",
                        fontSize: "1rem"
                    }}
                >
                    שלח אירוע
                </button>
                <select
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    style={{
                        padding: "0.5rem",
                        flex: 1,
                        fontSize: "1rem",
                        height: "2.5rem"
                    }}
                    dir="rtl"
                >
                    {events.map((event) => (
                        <option key={event} value={event}>
                            {event}
                        </option>
                    ))}
                </select> 
                <select
                    value={selectedPikud}
                    onChange={(e) => setSelectedPikud(e.target.value)}
                    style={{
                        padding: "0.5rem",
                        flex: 1,
                        fontSize: "1rem",
                        height: "2.5rem"
                    }}
                    dir="rtl"
                >
                    {locations.map((loc) => (
                        <option key={loc} value={loc}>
                            {loc}
                        </option>
                    ))}
                </select> 
            </div>
        </div>
    );
};
