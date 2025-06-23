import { appConfig } from "../appConfig";

export const sendEvent = async (event: string) => {
        const status = event === 'קו נכנס לתוקף' ? 'CURRENT' : event === 'קו יצא מתוקף' ? "EXPIRED" : "DELETED" // This should be smarter

        try {
            await fetch(`${appConfig.SERVER_URL}/events/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: 'L123', status, userId: localStorage.getItem("user") }),
            });
        } catch (error: any) {
            console.log(`Error: ${error.message}`);
        }
}
