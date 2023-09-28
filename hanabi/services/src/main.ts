import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // middleware to pass origins into cors policy
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  // middleware to use validation pipes on request body or response data
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // telling app to listen on this port and run on it
  await app.listen(8000);
}
bootstrap();
