import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  const corsOptions: CorsOptions = {
    origin: true, // You can restrict it to a specific domain like "http://localhost:5173"
    credentials: true,
  };
  app.enableCors(corsOptions);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))

  await app.listen(3000);
}
bootstrap();
