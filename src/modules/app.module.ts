import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PulseModule } from './pulse.module';
import { DeviceModule } from './device.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    DeviceModule,
    PulseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
