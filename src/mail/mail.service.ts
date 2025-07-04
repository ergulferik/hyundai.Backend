import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { LoginLog } from '../auth/schemas/login-log.schema';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly mailTo: string;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: true,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });

    this.mailTo = this.configService.get<string>('MAIL_TO') ?? 'erg_mlk_1656@hotmail.com';
  }

  async sendLoginMail(log: LoginLog): Promise<void> {
    const subject = 'Yeni Giriş Bildirimi';
    const text = `
      Yeni bir giriş yapıldı:
      
      Ad: ${log.user.name} ${log.user.surname}
      Telefon: ${log.user.phone}
      
      QR Kod Bilgileri:
      - ID: ${log.qrData.id}
      - Konum: ${log.qrData.latitude}, ${log.qrData.longitude}
      
      Kullanıcı Konumu:
      - Konum: ${log.currentLocation.latitude}, ${log.currentLocation.longitude}
      
      Tarih: ${log.loginTime.toLocaleString('tr-TR')}
    `;

    await this.sendMail(subject, text);
  }

  async sendLogoutMail(log: LoginLog): Promise<void> {
    const subject = 'Yeni Çıkış Bildirimi';
    const text = `
      Yeni bir çıkış yapıldı:
      
      Ad: ${log.user.name} ${log.user.surname}
      Telefon: ${log.user.phone}
      
      QR Kod Bilgileri:
      - ID: ${log.qrData.id}
      - Konum: ${log.qrData.latitude}, ${log.qrData.longitude}
      
      Kullanıcı Konumu:
      - Konum: ${log.currentLocation.latitude}, ${log.currentLocation.longitude}
      
      Tarih: ${log.loginTime.toLocaleString('tr-TR')}
    `;

    await this.sendMail(subject, text);
  }

  private async sendMail(subject: string, text: string): Promise<void> {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: Number(this.configService.get('SMTP_PORT')), // dikkat: sayı olmalı
      secure: true, // ✅ SSL (port 465 için)
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
    await this.transporter.sendMail({
      from: this.configService.get<string>('SMTP_USER'),
      to: this.mailTo,
      subject,
      text,
    });
  }
} 