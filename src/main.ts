import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const envClientOrigin = configService.get<string>('CLIENT_ORIGINS');
  const clientOrigin = envClientOrigin.split(',');

  app.enableCors({
    origin: clientOrigin,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
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
