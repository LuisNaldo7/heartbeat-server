import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PulseModule } from './infrastructure/database/modules/pulse.module';
import { StatsModule } from './infrastructure/database/modules/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    StatsModule,
    PulseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
