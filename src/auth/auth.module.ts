import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginLog, LoginLogSchema } from './schemas/login-log.schema';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    ConfigModule,
    MailModule,
    MongooseModule.forFeature([
      { name: LoginLog.name, schema: LoginLogSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {} 