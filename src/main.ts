import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // To enable cors
  app.enableCors({
    origin: '*',
  });

  await app.listen(process.env.PORT ?? 3000);

  // To get the full url after the app starts
  const url = await app.getUrl();
  console.log(`Application is running on: ${url}`);
}
bootstrap();
