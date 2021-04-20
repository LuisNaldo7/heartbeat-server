import { Controller, Get, Inject } from '@nestjs/common';
import { StatsServiceInterface } from 'src/application/stats.service.interface';

@Controller('stats')
export class StatsController {
  private statsService: StatsServiceInterface;

  constructor(@Inject('StatsService') statsService: StatsServiceInterface) {
    this.statsService = statsService;
  }

  @Get('devices')
  async devices(): Promise<{ devices: string }> {
    try {
      const devices = await this.statsService.getDevices();
      return { devices };
    } catch (error) {
      return { 
        devices: error.toString() 
      };
    }
  }
}
