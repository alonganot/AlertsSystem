import { LineEvent } from "@Entities/LineEvent"

export const convetLineEventToMessage = (event: LineEvent) => {
    const action = event.status === 'DELETED' ? 'נמחק' :
                    event.status === 'CURRENT' ? 'הוכנס לתוקף' :
                    'הוצא מתוקף'

    return `${event.userId} ${action} על ידי ${event.id} :הקו`
}