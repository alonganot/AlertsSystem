import type { User } from "@Entities/User";
import { appConfig } from "../appConfig";
import type { LineEvent } from '@Entities/LineEvent'

export const sendEvent = async (event: string, pikud: string) => {
        const status = event === 'קו נכנס לתוקף' ? 'CURRENT' : event === 'קו יצא מתוקף' ? "EXPIRED" : "DELETED" // This should be smarter
        const lineEvent: LineEvent = {
            id: 'L123', 
            status,            
            pikud,  
            userId: (JSON.parse(localStorage.getItem("userData")!) as User).user ?? 'לא ידוע',
            date: new Date
        }
        
        try {
            await fetch(`${appConfig.SERVER_URL}/events/${status === 'DELETED' ? 'delete' : 'update'}`, {
                method: status === 'DELETED' ? "DELETE" :"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(lineEvent),
            });
        } catch (error: any) {
            console.log(`Error: ${error.message}`);
        }
}
