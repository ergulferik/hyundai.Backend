import { Controller, Post, Body, Ip, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginLog } from './schemas/login-log.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Kimlik Doğrulama')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Kullanıcı girişi' })
  @ApiResponse({ 
    status: 200, 
    description: 'Başarılı giriş',
    schema: {
      example: {
        success: true,
        data: {
          user: {
            phone: '+905551234567',
            name: 'Ahmet',
            surname: 'Yılmaz'
          },
          currentLocation: {
            latitude: 41.0082,
            longitude: 28.9784,
            accuracy: 10.5
          },
          loginTime: '2024-03-14T12:00:00Z',
          ipAddress: '192.168.1.1',
          qrData: {
            id: 'qr_20250703_001',
            latitude: 38.4729088,
            longitude: 27.1253504
          }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Yetkisiz giriş' })
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Ip() ipAddress: string) {
    return this.authService.login(loginDto, ipAddress);
  }

  @ApiOperation({ summary: 'Kullanıcı çıkışı' })
  @ApiResponse({ 
    status: 200, 
    description: 'Başarılı çıkış',
    schema: {
      example: {
        success: true,
        data: {
          user: {
            phone: '+905551234567',
            name: 'Ahmet',
            surname: 'Yılmaz'
          },
          action: 'logout'
        }
      }
    }
  })
  @ApiOperation({ summary: 'Kullanıcı çıkışı' })
  @ApiResponse({ 
    status: 200, 
    description: 'Başarılı çıkış',
    schema: {
      example: {
        success: true,
        data: {
          user: {
            phone: '+905551234567',
            name: 'Ahmet',
            surname: 'Yılmaz'
          },
          action: 'logout'
        }
      }
    }
  })
  @Post('logout')
  async logout(@Body() phoneData: { phone: string }) {
    return this.authService.logout(phoneData);
  }
} 