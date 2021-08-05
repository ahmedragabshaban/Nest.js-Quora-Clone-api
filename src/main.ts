import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder().setTitle('API').build(),
  );
  SwaggerModule.setup('docs', app, document);

  // handle all user input validation globally
  app.useGlobalPipes(new ValidateInputPipe());
  // await app.listen(3000);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
