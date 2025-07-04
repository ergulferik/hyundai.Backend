import { IsString, IsPhoneNumber, IsDate, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDto {
  @ApiProperty({
    description: 'Kullanıcı telefon numarası',
    example: '05551234567'
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Kullanıcı adı',
    example: 'Ahmet'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Kullanıcı soyadı',
    example: 'Yılmaz'
  })
  @IsString()
  surname: string;
}

export class GeoLocationDto {
  @ApiProperty({
    description: 'Enlem',
    example: 41.0082
  })
  @IsNumber()
  @Type(() => Number)
  latitude: number;

  @ApiProperty({
    description: 'Boylam',
    example: 28.9784
  })
  @IsNumber()
  @Type(() => Number)
  longitude: number;

  @ApiProperty({
    description: 'Konum doğruluk değeri',
    example: 10.5,
    required: false
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  accuracy?: number;
}

export class QrLocationDto {
  @ApiProperty({
    description: 'QR kod ID',
    example: 'qr_20250703_001'
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'QR kod konumu - Enlem',
    example: 41.0082
  })
  @IsNumber()
  @Type(() => Number)
  latitude: number;

  @ApiProperty({
    description: 'QR kod konumu - Boylam',
    example: 28.9784
  })
  @IsNumber()
  @Type(() => Number)
  longitude: number;
}

export class LoginDto {
  @ApiProperty({
    description: 'Kullanıcı bilgileri',
    type: () => UserInfoDto
  })
  @ValidateNested()
  @Type(() => UserInfoDto)
  user: UserInfoDto;

  @ApiProperty({
    description: 'Kullanıcının mevcut konumu',
    type: () => GeoLocationDto
  })
  @ValidateNested()
  @Type(() => GeoLocationDto)
  currentLocation: GeoLocationDto;

  @ApiProperty({
    description: 'Giriş zamanı',
    example: '2024-03-14T12:00:00Z'
  })
  @IsDate()
  @Type(() => Date)
  loginTime: Date;

  @ApiProperty({
    description: 'QR kod bilgileri',
    type: () => QrLocationDto
  })
  @ValidateNested()
  @Type(() => QrLocationDto)
  qrData: QrLocationDto;
} 