import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(cookieParser());

  // const serverConfig = config.get('server')
  // const server{P}
  await app.listen(3000);
}
bootstrap();
