import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { PulseServiceInterface } from 'src/application/pulse.service.interface';

@Controller('pulse')
export class PulseController {
  private pulseService: PulseServiceInterface;

  constructor(@Inject('PulseService') pulseService: PulseServiceInterface) {
    this.pulseService = pulseService;
  }

  @Post('beat')
  @HttpCode(200)
  async beat(
    @Body('guid') guid: string,
    @Body('type') type: string,
  ): Promise<any> {
    try {
      await this.pulseService.beat(guid, type);
      return { err: '', res: { status: 'ok' } };
    } catch (error) {
      console.error(error);
      return { err: error, res: { status: 'failed' } };
    }
  }
}
