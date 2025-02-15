import { NestFactory } from '@nestjs/core';
import { AppModule } from './config/app.module';
import configSwagger from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configSwagger(app);

  await app.listen(process.env.APP_PORT ?? 8000);
}

bootstrap();
