import { Module } from '@nestjs/common';
import { AppService } from './application/app.service';
import { PulseService } from './application/pulse.service';
import { StatsService } from './application/stats.service';

import { AppController } from './controller/app.controller';
import { PulseController } from './controller/pulse.controller';
import { StatsController } from './controller/stats.controller';

@Module({
  imports: [],
  controllers: [AppController, PulseController, StatsController],
  providers: [AppService, PulseService, StatsService],
})
export class AppModule {}
