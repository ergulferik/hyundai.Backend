import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginLog } from '../auth/schemas/login-log.schema';
import { GetLogsDto } from './dto/get-logs.dto';

@Injectable()
export class LogService {
  constructor(
    @InjectModel(LoginLog.name) private loginLogModel: Model<LoginLog>,
  ) {}

  async getLogs(query: GetLogsDto) {
    const { skip = 0, take = 10, startDate, endDate, action } = query;

    const filter: any = {};

    if (startDate || endDate) {
      filter.loginTime = {};
      if (startDate) {
        const startDateTime = new Date(startDate);
        startDateTime.setHours(0, 0, 0, 0);
        filter.loginTime.$gte = startDateTime;
        console.log('Start Date Filter:', startDateTime);
      }
      if (endDate) {
        const endOfDay = new Date(endDate);
        endOfDay.setHours(23, 59, 59, 999);
        filter.loginTime.$lte = endOfDay;
        console.log('End Date Filter:', endOfDay);
      }
    }

    if (action) {
      filter.action = action;
    }

    console.log('MongoDB Filter:', JSON.stringify(filter, null, 2));

    const [logs, total] = await Promise.all([
      this.loginLogModel
        .find(filter)
        .sort({ loginTime: -1 })
        .skip(skip)
        .limit(take)
        .exec(),
      this.loginLogModel.countDocuments(filter),
    ]);

    console.log('Found logs count:', logs.length);
    console.log('Total documents:', total);
    console.log('Sample log dates:', logs.slice(0, 2).map(log => log.loginTime));

    return {
      data: logs,
      meta: {
        skip,
        take,
        total,
        hasMore: skip + take < total,
        appliedFilters: {
          startDate: startDate ? new Date(startDate).toISOString() : null,
          endDate: endDate ? new Date(endDate).toISOString() : null,
          action: action || null
        }
      },
    };
  }
} 