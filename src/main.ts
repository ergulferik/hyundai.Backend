import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS ayarları
  app.enableCors({
    origin: true, // Geliştirme ortamında tüm originlere izin ver
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Swagger yapılandırması
  const config = new DocumentBuilder()
    .setTitle('Login API')
    .setDescription('Login sistemi için API dokümantasyonu')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Validation pipe yapılandırması
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Otomatik tip dönüşümü
    whitelist: true, // DTO'da tanımlı olmayan özellikleri kaldır
    forbidNonWhitelisted: true, // DTO'da tanımlı olmayan özellikler varsa hata ver
    transformOptions: {
      enableImplicitConversion: true // String'den number'a otomatik dönüşüm
    }
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
