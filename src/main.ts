import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'app/app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new FastifyAdapter({ logger: true, ignoreTrailingSlash: true }),
  );

  const config = new DocumentBuilder()
    .setTitle('Search API')
    .setVersion(process.env.VERSION)
    .build();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(``, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      layout: `BaseLayout`,
      displayRequestDuration: true,
    },
  });

  await app.listen(8000, process.env.NEST_ADDRESS);
}
bootstrap();
