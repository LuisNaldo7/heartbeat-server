import { Controller, Get, HttpCode, Inject } from '@nestjs/common';
import { StatsServiceInterface } from 'src/application/stats.service.interface';
import { DeviceEntity } from 'src/infrastructure/database/entities/device.entity';

@Controller('stats')
export class StatsController {
  private statsService: StatsServiceInterface;

  constructor(@Inject('StatsService') statsService: StatsServiceInterface) {
    this.statsService = statsService;
  }

  @Get('devices')
  @HttpCode(200)
  // TODO return DeviceDTO
  async devices(): Promise<{ devices: DeviceEntity[] }> {
    try {
      const devices = await this.statsService.getAllDevices();
      return { devices };
    } catch (error) {
      console.log(error);
      return { devices: error.toString() };
    }
  }
}
