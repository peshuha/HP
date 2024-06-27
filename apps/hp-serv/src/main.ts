/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app/app.module';
import { ConfigService } from './app/config/config.service';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS
  app.enableCors();
  
  // Доступ к public ресурсам
  console.log("bootstrap", ConfigService.Config().public_img.path, ConfigService.Config().public_img.prefix)
  app.useStaticAssets(ConfigService.Config().public_img.path, {prefix: ConfigService.Config().public_img.prefix});

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
