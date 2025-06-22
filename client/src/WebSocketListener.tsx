import { useEffect } from "react";
import { useNotifications } from "./context/NotificationsContext"
import { io, Socket } from "socket.io-client";
import { appConfig } from "./appConfig";

const WebSocketListener: React.FC = () => {
  const { addNotification } = useNotifications();

    const sendNotification = (message: string) => {
        const date = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).format(new Date())

        addNotification({ message, date })

        if (Notification.permission === "granted") {
            new Notification(message, {
                icon: "/map-icon.png", 
            });
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("user")) {
            localStorage.setItem("user", "defaultuser")
        }
        const socket: Socket = io(`${appConfig.WS_SERVER_URL}?clientId=${localStorage.getItem("user")}`, {
        transports: ["websocket"],
        });

        socket.on("connect", () => {
        console.log("[Socket.IO] Connected");
        });

        //TODO: listen only to messages that you care about (fetch from db)
        socket.on("kafka-message", (data: string) => {
            try {
                sendNotification(data);
            } catch (error) {
                console.error("[WebSocket] Error parsing message", error);
            }
        });

        socket.on("disconnect", (reason) => {
        console.warn("[Socket.IO] Disconnected:", reason);
        });

        return () => {
        socket.disconnect();
        };
    }, [addNotification]);

  return null; // No UI
};

export { WebSocketListener }
