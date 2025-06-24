import { Injectable } from "@nestjs/common";
import { executeQuery } from "src/db/dbConnection";
import { NotificationType } from '@Entities/NotificationTypes'

@Injectable()
export class NotificationTypesRepository {
    async getNotificationTypeById (id: number) {
        const query = `
            SELECT id, description, permissions, filters, format 
            FROM user_preference.notification_types
            WHERE id = ${id}
        `

        const data = await executeQuery<NotificationType>(query)
        
        if (!data.length) {
            throw Error("bad id")
        }

        return data[0]
    }
}