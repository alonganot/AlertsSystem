import { LineEvent } from "@Entities/LineEvent"
import { NotificationType } from "@Entities/NotificationTypes"
import { User } from '@Entities/User'

export const convetLineEventToMessage = (
    event: LineEvent, 
    notificationTypes: NotificationType
) => {
    const params = [event.id, event.userId, event.date.toString()]
    let index = 0

    return notificationTypes.format.replace(/<\$>/g, () => {
        return params[index++] ?? "<$>";
    })
}


export const getfilterClientsFunction = (
    event: LineEvent,
    notificationTypes: NotificationType
) => {
    return (client: User) => {
        return client.user !== event.userId &&
            notificationTypes.filters.every((filter) => client[filter] === event[filter])
    }
}