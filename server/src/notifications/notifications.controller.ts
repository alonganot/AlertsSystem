import { Body, Controller, Delete, Get, Post, Query, Req } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post("subscribe")
  subscribe(@Body() sub: any, @Req() req) {
    return this.notificationsService.subscribeEvent();
  }

  @Get()
  async getAllNotifications() {
    return this.notificationsService.getAllNotifications();
  }

  @Post('user-notification')
  async addUserNotification(
    @Body() body: { user_id: number; notification_id: number },
  ) {
    return this.notificationsService.addUserNotification(
      body.user_id,
      body.notification_id,
    );
  }

  @Delete('user-notification')
  async removeUserNotification(
    @Query('user_id') user_id: string,
    @Query('notification_id') notification_id: string,
  ) {
    return this.notificationsService.removeUserNotification(
      Number(user_id),
      Number(notification_id),
    );
  }
}

