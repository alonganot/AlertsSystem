import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsumerService } from './consumer/consumer.service';
import { WebsocketGateway } from './websocket/websocket.gateway';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const consumer = app.get(ConsumerService)
  const wsGateway = app.get(WebsocketGateway)
  consumer.setGateway(wsGateway)
  await app.listen(process.env.PORT ?? 8080)
}
bootstrap();
