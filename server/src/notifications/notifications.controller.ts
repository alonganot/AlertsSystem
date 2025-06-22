import { BadRequestException, Body, Controller, Delete, Get, Post, Query, Req } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post("subscribe")
  subscribe(@Body() sub: any, @Req() req) {
    return this.notificationsService.subscribeEvent();
  }

  @Get()
  async getAllNotifications(
    @Query('user_id') userId: string,
  ) {
    if (!userId) {
      throw new BadRequestException("No user_id provided")
    }
    return this.notificationsService.getAllNotifications(userId);
  }

  @Post('user-notification')
  async addUserNotification(
    @Body() body: { userId: string; notificationId: number },
  ) {
    return this.notificationsService.addUserNotification(
      body.userId,
      body.notificationId,
    );
  }

  @Delete('user-notification')
  async removeUserNotification(
    @Query('user_id') userId: string,
    @Query('notification_id') notificationId: string,
  ) {
    return this.notificationsService.removeUserNotification(
      userId,
      Number(notificationId),
    );
  }
}

