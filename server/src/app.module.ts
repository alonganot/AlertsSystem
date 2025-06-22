import { Module } from "@nestjs/common";

import { NotificationsModule } from "./notifications/notifications.module";
import { EventsModule } from "./events/events.module";

@Module({
  imports: [
    NotificationsModule,
    EventsModule
  ]
})
export class AppModule {}
