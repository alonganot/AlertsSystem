import { useEffect, useState, type FC } from "react";
import { sendEvent } from "../api/Events";
import styled from "styled-components";
import { pikuds } from "../consts";

const events = ["קו נכנס לתוקף", "קו יצא מתוקף", "קו נמחק"];

const EventButton = styled('button')({
    padding: "0.5rem",
    fontSize: "1rem",
    height: "2.5rem"
});

const EventSelecter = styled('select')({
    padding: "0.5rem",
    flex: 1,
    fontSize: "1rem",
    height: "2.5rem"
});

export const EventSender: FC = () => {
    const [selectedEvent, setSelectedEvent] = useState<string>(events[0]);    
    const [selectedPikud, setSelectedPikud] = useState<string>(pikuds[0]);    

    useEffect(() => {
        if ("Notification" in window && Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    }, []);

    return (
       <div style={{ display: "flex", flexDirection: "row-reverse", gap: "2rem", alignItems: "center" }}>
            <h2>:בחר אירוע</h2>
            <div>
                <EventButton
                    onClick={() => sendEvent(selectedEvent, selectedPikud)}
                >
                    שלח אירוע
                </EventButton>
                <EventSelecter
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    dir="rtl"
                >
                    {events.map((event) => (
                        <option key={event} value={event}>
                            {event}
                        </option>
                    ))}
                </EventSelecter> 
                <EventSelecter
                    value={selectedPikud}
                    onChange={(e) => setSelectedPikud(e.target.value)}
                    dir="rtl"
                >
                    {pikuds.map((pikud) => (
                        <option key={pikud} value={pikud}>
                            {pikud}
                        </option>
                    ))}
                </EventSelecter> 
            </div>
        </div>
    );
};
