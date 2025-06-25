import { Module } from "@nestjs/common";

import { NotificationsModule } from "./notifications/notifications.module";
import { EventsModule } from "./events/events.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    NotificationsModule,
    EventsModule,
    UsersModule
  ]
})
export class AppModule {}
