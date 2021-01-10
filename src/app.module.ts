import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PulseController } from './pulse/pulse.controller';
import { StatsController } from './stats/stats.controller';

@Module({
  imports: [],
  controllers: [AppController, PulseController, StatsController],
  providers: [AppService],
})
export class AppModule {}
