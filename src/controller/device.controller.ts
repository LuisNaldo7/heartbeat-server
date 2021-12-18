import {
  Controller,
  Get,
  HttpCode,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DeviceServiceInterface } from 'src/application/device.service.interface';
import { DevicesResponseDto } from './dtos/devices-response.dto';

@ApiTags('Device')
@Controller('device')
export class DeviceController {
  private deviceService: DeviceServiceInterface;

  constructor(@Inject('DeviceService') deviceService: DeviceServiceInterface) {
    this.deviceService = deviceService;
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Returns devices.',
    description: 'Returns an array of all known devices.',
  })
  @ApiOkResponse({
    description: 'Devices were successfully returned.',
    type: DevicesResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  async devices(): Promise<DevicesResponseDto> {
    try {
      const devices = await this.deviceService.getAllDevices();

      const mappedDevices = devices.map((entry) => {
        return {
          description: entry.description,
          maxTimeout: entry.maxTimeout,
          lastSeen: entry.lastSeen,
          alertSentMail: entry.alertSentMail,
          alertSentDiscord: entry.alertSentDiscord,
        };
      });

      return new DevicesResponseDto(mappedDevices);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
