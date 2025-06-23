export const appConfig = {
    SERVER_URL: import.meta.env.VITE_SERVER_URL ?? "http://localhost:3000",
    WS_SERVER_URL: import.meta.env.VITE_WS_SERVER_URL ?? "ws://localhost:8080"
}