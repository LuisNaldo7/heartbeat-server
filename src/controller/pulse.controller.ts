import { Body, Controller, Inject, Post } from '@nestjs/common';
import { PulseServiceInterface } from 'src/application/pulse.service.interface';

@Controller('pulse')
export class PulseController {
  private pulseService: PulseServiceInterface;

  constructor(@Inject('PulseService') pulseService: PulseServiceInterface) {
    this.pulseService = pulseService;
  }

  @Post('beat')
  async beat(@Body('guid') guid: string) {
    this.pulseService.beat(guid);
  }

  @Post('rise')
  async rise(@Body('guid') guid: string) {
    this.pulseService.rise(guid);
  }

  @Post('die')
  async die(@Body('guid') guid: string) {
    this.pulseService.die(guid);
  }
}
