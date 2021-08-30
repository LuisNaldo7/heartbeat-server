import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import { PulseType } from '../../domain/pulse-type';

export class PulseRequestDto {
  @ApiProperty({
    description: 'Device ID in UUIDv4 format.',
    example: 'ede88b30-1ba0-431a-9775-acfdf2ac0f57',
  })
  @IsUUID(4)
  public readonly deviceId: string;

  @ApiProperty({
    description: 'Type of pulse.',
    enum: PulseType,
  })
  @IsEnum(PulseType)
  public readonly type: string;

  constructor(deviceId: string, type: string) {
    this.deviceId = deviceId;
    this.type = type;
  }
}
