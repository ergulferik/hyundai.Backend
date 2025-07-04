import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/hyundai-login'),
    AuthModule,
    MailModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
