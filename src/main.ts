import {
  HttpStatus,
  Logger,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { nestCsrf } from 'ncsrf';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.use(helmet());

  app.enableCors({
    origin: function (origin, callback) {
      const ALLOWED_ORIGINS = config.get<string>('ALLOWED_ORIGINS').split(',');

      if (!origin || ALLOWED_ORIGINS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        throw new UnauthorizedException('Not allowed by CORS');
      }
    },
    methods: ['GET', 'POST', 'POST', 'DELETE', 'UPDATE'],
    credentials: true,
  });

  app.use(cookieParser());
  app.use(nestCsrf());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  await app.listen(AppModule.APP_PORT, () => {
    logger.log(`Application is running on PORT: ${AppModule.APP_PORT}`);
  });
}
bootstrap();
