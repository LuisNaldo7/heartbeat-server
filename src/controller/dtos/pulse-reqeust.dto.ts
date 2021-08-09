import { IsEnum, IsUUID } from 'class-validator';
import { PulseType } from 'src/domain/pulse-type';

export class PulseRequestDto {
  @IsUUID(4)
  public readonly deviceId: string;

  @IsEnum(PulseType)
  public readonly type: string;

  constructor(deviceId: string, type: string) {
    this.deviceId = deviceId;
    this.type = type;
  }
}
