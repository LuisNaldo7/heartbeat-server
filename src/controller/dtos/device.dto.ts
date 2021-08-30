import { ApiProperty } from '@nestjs/swagger';

export class DeviceDto {
  @ApiProperty({
    description: 'Device description.',
    example: 'client-1',
  })
  description?: string;

  @ApiProperty({
    description: 'The unix time the device was last seen.',
    example: '1630357725',
    nullable: true,
  })
  lastSeen?: number;

  constructor(description: string, lastSeen: number) {
    this.description = description;
    this.lastSeen = lastSeen;
  }
}
