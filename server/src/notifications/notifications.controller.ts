import { Body, Controller, Post, Req } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post("subscribe")
  subscribe(@Body() sub: any, @Req() req) {
    return this.notificationsService.subscribeEvent();
  }
}
