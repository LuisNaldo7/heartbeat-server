import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsService } from '../../../application/stats.service';
import { StatsController } from '../../../controller/stats.controller';
import { DeviceEntity } from '../entities/device.entity';
import { DevicesRepository } from '../repositories/devices.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceEntity])],
  providers: [StatsService, DevicesRepository],
  controllers: [StatsController],
})
export class StatsModule {}
