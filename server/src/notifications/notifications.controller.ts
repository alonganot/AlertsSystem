import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
} from "@nestjs/common";
import { NotificationsService } from "./notifications.service";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getAllNotifications(@Query("user_id") userId: string) {
    if (!userId) {
      throw new BadRequestException("No user_id provided");
    }
    return this.notificationsService.getAllNotifications(userId);
  }

  @Post("user-notification")
  async addUserNotification(
    @Body() body: { userId: string; notificationTypeId: number }
  ) {
    return this.notificationsService.addUserNotification(
      body.userId,
      body.notificationTypeId
    );
  }

  @Delete("user-notification")
  async removeUserNotification(
    @Query("user_id") userId: string,
    @Query("notification_id") notificationId: number
  ) {
    return this.notificationsService.removeUserNotification(
      userId,
      notificationId
    );
  }
}
