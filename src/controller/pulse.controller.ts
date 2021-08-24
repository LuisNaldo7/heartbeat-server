import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { PulseServiceInterface } from 'src/application/pulse.service.interface';
import { PulseRequestDto } from './dtos/pulse-reqeust.dto';

@Controller('pulse')
export class PulseController {
  private pulseService: PulseServiceInterface;

  constructor(@Inject('PulseService') pulseService: PulseServiceInterface) {
    this.pulseService = pulseService;
  }

  @Post()
  @HttpCode(200)
  async beat(@Body() pulseRequestDto: PulseRequestDto): Promise<any> {
    try {
      await this.pulseService.beat(
        pulseRequestDto.deviceId,
        pulseRequestDto.type,
      );
      return { err: '', res: { status: 'ok' } };
    } catch (error) {
      console.error(error);
      return { err: error, res: { status: 'failed' } };
    }
  }
}
