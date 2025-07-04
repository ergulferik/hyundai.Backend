import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { LoginLog, LoginLogSchema } from '../auth/schemas/login-log.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: LoginLog.name, schema: LoginLogSchema },
    ]),
  ],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {} 