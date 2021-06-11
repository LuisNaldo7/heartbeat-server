import { Module } from '@nestjs/common';
import { PulseService } from './application/pulse.service';
import { StatsService } from './application/stats.service';

import { PulseController } from './controller/pulse.controller';
import { StatsController } from './controller/stats.controller';

@Module({
  imports: [],
  controllers: [PulseController, StatsController],
  providers: [PulseService, StatsService],
})
export class AppModule {}
