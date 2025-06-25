import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { appConfig } from "../appConfig";
import { pikuds } from "../consts";
import type { User } from "@Entities/User";

type Handler = (message: string) => void;

interface SocketContextValue {
  isSocketReady: boolean,
  onEvent(event: string, handler: Handler): void;
  offEvent(event: string, handler: Handler): void;
}

const SocketContext = createContext<SocketContextValue | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);
  const [isSocketReady, setIsSocketReady] = useState<boolean>(false)

  useEffect(() => {
    const { user }: User = JSON.parse(
      localStorage.getItem("userData") ??
        JSON.stringify({ user: "defaultuser", pikud: pikuds[0] })
    );

    socketRef.current = io(`${appConfig.WS_SERVER_URL}?clientId=${user}`, { // need to add pikud here
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
        console.log("[Socket.IO] Connected")
        setIsSocketReady(true)
    })

    socketRef.current.on("disconnect", (reason) => {
        console.warn("[Socket.IO] Disconnected:", reason)
        setIsSocketReady(false)
    });

    return () => { socketRef.current?.disconnect() };
  }, []);

  const onEvent = (event: string, handler: Handler) => {
    socketRef.current?.on(event, handler);
  };
  const offEvent = (event: string, handler: Handler) => {
    socketRef.current?.off(event, handler);
  };

  return <SocketContext.Provider value={{ isSocketReady, onEvent, offEvent }}>{children}</SocketContext.Provider>;
};

const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("useSocket must be used inside a SocketProvider");
  return ctx;
};

// ✅ The helper hook that deals with auto unsubscribing to event
export function useSocketEvent(event: string, handler: Handler) {
  const { onEvent, offEvent, isSocketReady } = useSocket();

  useEffect(() => {  
    if (!isSocketReady) return
    
    onEvent(event, handler)
    return () => offEvent(event, handler) 
  }, [isSocketReady, event]);
}
