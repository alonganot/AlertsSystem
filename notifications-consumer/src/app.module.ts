import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer/consumer.service';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { NotificationTypesService } from './notificationTypes/notificationTypes.Service';

@Module({
  providers: [ConsumerService, WebsocketGateway, NotificationTypesService],
})
export class AppModule {}
