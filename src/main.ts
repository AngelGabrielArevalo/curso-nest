import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  app.setGlobalPrefix('api/v1');
  app.enableCors(CORS);
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  await app.listen(PORT);
}
bootstrap();
