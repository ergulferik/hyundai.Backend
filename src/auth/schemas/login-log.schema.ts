import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class UserInfo {
  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;
}

@Schema()
class GeoLocation {
  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop({ required: false })
  accuracy?: number;
}

@Schema()
class QrData {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;
}

@Schema()
export class LoginLog extends Document {
  @Prop({ required: true, type: () => UserInfo })
  user: UserInfo;

  @Prop({ required: true, type: () => GeoLocation })
  currentLocation: GeoLocation;

  @Prop({ required: true })
  loginTime: Date;

  @Prop({ required: true })
  ipAddress: string;

  @Prop({ required: true, default: true })
  success: boolean;

  @Prop({ required: true, type: () => QrData })
  qrData: QrData;

  @Prop({ required: true, default: 'login' })
  action: string;
}

export const LoginLogSchema = SchemaFactory.createForClass(LoginLog); 