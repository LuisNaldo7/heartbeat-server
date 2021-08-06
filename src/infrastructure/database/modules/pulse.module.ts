import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PulseService } from 'src/application/pulse.service';
import { PulseController } from 'src/controller/pulse.controller';
import { DeviceEntity } from '../entities/device.entity';
import { DevicesRepository } from '../repositories/devices.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceEntity])],
  providers: [PulseService, DevicesRepository],
  controllers: [PulseController],
})
export class PulseModule {}
