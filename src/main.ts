import { NestFactory } from '@nestjs/core';
import {
  BadRequestException,
  flatten,
  HttpStatus,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const APP_NAME = process.env.npm_package_name;
  const APP_VERSION = process.env.npm_package_version;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) =>
        new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          Message: flatten(
            errors.map((error) => Object.values(error.constraints)),
          ),
        }),
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(`The ${APP_NAME} API description`)
    .setVersion(APP_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
