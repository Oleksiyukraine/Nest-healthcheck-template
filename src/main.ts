import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './components/app/app.module';
const logger: Logger = new Logger('Main file');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => logger.verbose(`The server is running on ${port} port`));
}
bootstrap();
