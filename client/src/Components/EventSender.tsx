import { useEffect, useState, type FC } from "react";

const BACKEND_URL = 'localhost:3000';

const events = ["קו נכנס לתוקף", "קו יצא מתוקף", "קו נמחק"];

export const EventSender: FC = () => {
    const [selectedEvent, setSelectedEvent] = useState<string>('');    

    useEffect(() => {
        if ("Notification" in window && Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    }, []);

    const sendNotification = () => {
        if (Notification.permission === "granted") {
            new Notification(selectedEvent, {
                icon: "/map-icon.png", 
            });
        }
    };
    
    const sendEvent = async () => {
        sendNotification();

        try {
            await fetch(`${BACKEND_URL}/notifications/subscribe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ selectedEvent }),
            });
        } catch (error: any) {
            console.log(`Error: ${error.message}`);
        }
    };

    return (
       <div style={{ display: "flex", flexDirection: "row-reverse", gap: "2rem", alignItems: "center" }}>
            <h2>:בחר אירוע</h2>
            <div>
                <button
                    onClick={sendEvent}
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
            </div>
        </div>
    );
};
