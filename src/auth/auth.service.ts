import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { LoginLog } from './schemas/login-log.schema';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(LoginLog.name) private loginLogModel: Model<LoginLog>,
    private mailService: MailService,
  ) {}

  async login(loginDto: LoginDto, ipAddress: string) {
    // Giriş logu oluştur
    const loginLog = new this.loginLogModel({
      user: loginDto.user,
      currentLocation: loginDto.currentLocation,
      qrData: loginDto.qrData,
      ipAddress,
      loginTime: new Date(),
      success: true,
      action: 'login'
    });
    await loginLog.save();

    // Başarılı giriş e-postası gönder
    await this.mailService.sendLoginMail(loginLog);

    return {
      success: true,
      data: loginDto.user
    };
  }

  async logout(phoneData: { phone: string }) {
    // Son giriş kaydını bul
    const lastLogin = await this.loginLogModel
      .findOne({ 
        'user.phone': phoneData.phone,
        action: 'login'
      })
      .sort({ loginTime: -1 })
      .exec();

    if (!lastLogin) {
      return {
        success: false,
        message: 'Aktif oturum bulunamadı'
      };
    }

    // Çıkış logu oluştur
    const logoutLog = new this.loginLogModel({
      user: lastLogin.user,
      currentLocation: lastLogin.currentLocation, // Son bilinen konumu kullan
      qrData: lastLogin.qrData,
      ipAddress: lastLogin.ipAddress,
      loginTime: new Date(),
      success: true,
      action: 'logout'
    });
    await logoutLog.save();

    return {
      success: true,
      data: logoutLog
    };
  }
} 