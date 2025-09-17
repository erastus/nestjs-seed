import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { PageNotFoundExceptionFilter } from '@system/exeptions/page-not-found-exception/page-not-found-exception.filter';
import { Logger } from '@system/log/logger';
import { Boot } from '@system/boot';
import * as Constants from '@app/config/constants';
import pug from 'pug';

async function Bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const dotEnv = app.get(ConfigService);
  app.get(Boot).bootWeb();

  const SERVER_PORT = dotEnv.get<number>('SERVER_PORT');

  const logger = app.get(Logger);

  logger.info(
    `The following profile is active: "${dotEnv.get('ENVIRONMENT')}"`,
  );

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.engine('pug', (pug as any).__express);
  app.setViewEngine('pug');
  app.setBaseViewsDir(path.join(process.cwd()));

  app.useGlobalFilters(new PageNotFoundExceptionFilter());

  await app.listen(SERVER_PORT);
  logger.info(`${Constants.APP_NAMESPACE} running on port ${SERVER_PORT}`);
}
Bootstrap();
