import { Controller, Get, Inject, Param } from '@nestjs/common';
import { PulseServiceInterface } from 'src/application/pulse.service.interface';

@Controller('pulse')
export class PulseController {
  private pulseService: PulseServiceInterface;

  constructor(@Inject('PulseService') pulseService: PulseServiceInterface) {
    this.pulseService = pulseService;
  }

  @Get('beat/:guid')
  async beat(@Param('guid') guid) {
    this.pulseService.beat(guid);
  }

  @Get('rise/:guid')
  async rise(@Param('guid') guid) {
    this.pulseService.beat(guid);
  }

  @Get('die/:guid')
  async die(@Param('guid') guid) {
    this.pulseService.die(guid);
  }
}
