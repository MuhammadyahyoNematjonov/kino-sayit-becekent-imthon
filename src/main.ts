import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true
  }))
  const config = new DocumentBuilder()
  .setTitle('Kinolar Sayti APi')
  .setDescription('Kinolar sayti loyihasi')
  .setVersion('1.0')
  .addBearerAuth() 
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('swagger', app, document);
  await app.listen(process.env.PORT ?? 3000,'0.0.0.0');
  console.log(`http://localhost:${process.env.PORT ?? 3000}/swagger`);
  
}  
bootstrap();
