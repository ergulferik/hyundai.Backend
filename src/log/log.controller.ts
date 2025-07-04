import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { LogService } from './log.service';
import { GetLogsDto } from './dto/get-logs.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Loglar')
@ApiBearerAuth()
@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @ApiOperation({ summary: 'Giriş loglarını getir' })
  @ApiResponse({ 
    status: 200, 
    description: 'Başarılı',
    schema: {
      example: [{
        email: 'user@example.com',
        timestamp: '2024-03-14T12:00:00Z',
        success: true,
        ipAddress: '192.168.1.1'
      }]
    }
  })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  @ApiResponse({ status: 403, description: 'Admin yetkisi gerekli' })
  @Get()
  async getLogs(@Query() getLogsDto: GetLogsDto) {
    return this.logService.getLogs(getLogsDto);
  }
} 