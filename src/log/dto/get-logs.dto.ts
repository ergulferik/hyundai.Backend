import { IsOptional, IsString, IsDateString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetLogsDto {
  @ApiProperty({
    description: 'Atlanacak kayıt sayısı',
    required: false,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  skip?: number = 0;

  @ApiProperty({
    description: 'Alınacak kayıt sayısı',
    required: false,
    default: 10
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  take?: number = 10;

  @ApiProperty({
    description: 'Başlangıç tarihi',
    example: '2024-03-21',
    required: false
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({
    description: 'Bitiş tarihi',
    example: '2024-03-21',
    required: false
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({
    description: 'İşlem tipi',
    example: 'login',
    enum: ['login', 'logout'],
    required: false
  })
  @IsOptional()
  @IsString()
  action?: 'login' | 'logout';
} 