import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const envMtOrigin = configService.get<string>('CLIENT_ORIGINS');
  const mtOrigin = envMtOrigin.split(',');

  app.enableCors({
    origin: mtOrigin,
    allowedHeaders: [
      'Content-Type',
      'Set-Cookie',
      'Access-Control-Allow-Origin',
      'Cache-Control',
      'Pragma',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const port = configService.get<number>('PORT');
  await app.listen(port || 8080);
}
bootstrap();
