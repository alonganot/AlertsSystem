import { useEffect, useState, type FC } from "react";
import { appConfig } from "../appConfig";

const events = ["קו נכנס לתוקף", "קו יצא מתוקף", "קו נמחק"];

export const EventSender: FC = () => {
    const [selectedEvent, setSelectedEvent] = useState<string>(events[0]);    

    useEffect(() => {
        if ("Notification" in window && Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    }, []);
    
    const sendEvent = async () => {
        const status = selectedEvent === 'קו נכנס לתוקף' ? 'CURRENT' : selectedEvent === 'קו יצא מתוקף' ? "EXPIRED" : "DELETED" // This should be smarter

        try {
            await fetch(`${appConfig.SERVER_URL}/event/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: 'L123', status, userId: localStorage.getItem("user") }),
            });
        } catch (error: any) {
            console.log(`Error: ${error.message}`);
        }
        // try {
        //     await fetch(`${appConfig.SERVER_URL}/notifications/subscribe`, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ selectedEvent }),
        //     });
        // } catch (error: any) {
        //     console.log(`Error: ${error.message}`);
        // }
    };

    return (
       <div style={{ display: "flex", flexDirection: "row-reverse", gap: "2rem", alignItems: "center", position: "absolute", right: "35%", top: "40%" }}>
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
