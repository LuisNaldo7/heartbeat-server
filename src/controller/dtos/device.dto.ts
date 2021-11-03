import { ApiProperty } from '@nestjs/swagger';

export class DeviceDto {
  @ApiProperty({
    description: 'Device description.',
    example: 'client-1',
  })
  description?: string;

  @ApiProperty({
    description: 'The maximum allowed time in seconds without any message.',
    example: '60',
    nullable: false,
  })
  maxTimeout?: number;

  @ApiProperty({
    description: 'The unix time the device was last seen.',
    example: '1630357725',
    nullable: true,
  })
  lastSeen?: number;

  @ApiProperty({
    description: 'Alert sent via mail.',
    example: 'false',
    nullable: false,
  })
  alertSentMail?: boolean;

  @ApiProperty({
    description: 'Alert sent on discord.',
    example: 'false',
    nullable: false,
  })
  alertSentDiscord?: boolean;

  constructor(
    description: string,
    lastSeen: number,
    maxTimeout: number,
    alertSentMail: boolean,
    alertSentDiscord: boolean,
  ) {
    this.description = description;
    this.maxTimeout = maxTimeout;
    this.lastSeen = lastSeen;
    this.alertSentMail = alertSentMail;
    this.alertSentDiscord = alertSentDiscord;
  }
}
