import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new FastifyAdapter({ logger: true, ignoreTrailingSlash: true }),
  );

  const config = new DocumentBuilder()
    .setTitle('Search API')
    .setDescription('The cats API description')
    .setVersion('1.0.0')
    .build();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(``, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      layout: `BaseLayout`,
      displayRequestDuration: true,
    },
  });

  await app.listen(3000, `0.0.0.0`);
}
bootstrap();
