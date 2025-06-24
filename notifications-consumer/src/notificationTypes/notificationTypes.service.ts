import { Injectable } from "@nestjs/common";
import { NotificationTypesRepository } from "./notificationTypes.repository";

@Injectable()
export class NotificationTypesService {
    private readonly notificationTypesRepository: NotificationTypesRepository

    async getNotificationTypeById (id: number) {
        return await this.notificationTypesRepository.getNotificationTypeById(id)
    }
}