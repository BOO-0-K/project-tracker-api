import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './_commons/exceptions/httpException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  await app.listen(port);
  console.log(`🚀 listening on port ${port}.`);
}
bootstrap();
