import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer/consumer.service';
import { WebsocketGateway } from './websocket/websocket.gateway';

@Module({
  providers: [ConsumerService, WebsocketGateway],
})
export class AppModule {}
