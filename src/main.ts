import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogInterceptor } from './interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  app.useGlobalInterceptors(new LogInterceptor()); //pode gravar info em algum lugar e ver como que ta o desempenho de cada rota dos controllers

  await app.listen(3000);
}
bootstrap();
