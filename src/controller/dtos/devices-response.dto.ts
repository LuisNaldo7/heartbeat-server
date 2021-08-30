import { ApiProperty } from '@nestjs/swagger';
import { DeviceDto } from './device.dto';

export class DevicesResponseDto {
  @ApiProperty({
    description: 'Array of devices.',
    type: [DeviceDto],
  })
  devices: DeviceDto[];

  constructor(devices: DeviceDto[]) {
    this.devices = devices;
  }
}
