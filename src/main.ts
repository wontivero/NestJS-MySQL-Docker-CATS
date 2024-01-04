import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //desde aca hasta...
  //Agregamos para q de forma global haga las validaciones y transformen los datos cuando pueda automaticamente
  app.setGlobalPrefix("api/v1");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
//hasta aca!...


  await app.listen(3000);
}
bootstrap();
