import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv = require('dotenv');
import { fallback } from './fallback-values';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(
    process.env.HEARTBEAT_SERVER_PORT || fallback.HEARTBEAT_SERVER_PORT,
  );
}

dotenv.config();
bootstrap();
