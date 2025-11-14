/*
 * ZeaZChain API Server
 * Author: ZeaZDev Meta-Intelligence
 * Main application entry point.
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.setGlobalPrefix('api/v1');

  const port = configService.get<number>('PORT', 3001);
  await app.listen(port);
  console.log(`[ZeaZChain API] Listening on port ${port}`);
}
bootstrap();
