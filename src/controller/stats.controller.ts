import { Controller, Get, HttpCode, Inject } from '@nestjs/common';
import { StatsServiceInterface } from 'src/application/stats.service.interface';

@Controller('stats')
export class StatsController {
  private statsService: StatsServiceInterface;

  constructor(@Inject('StatsService') statsService: StatsServiceInterface) {
    this.statsService = statsService;
  }

  @Get('devices')
  @HttpCode(200)
  async devices(): Promise<{ devices: string }> {
    try {
      const devices = await this.statsService.getDevices();
      return { devices };
    } catch (error) {
      return {
        devices: error.toString(),
      };
    }
  }
}
