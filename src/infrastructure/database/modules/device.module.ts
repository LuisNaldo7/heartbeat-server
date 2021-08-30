import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceService } from '../../../application/device.service';
import { DeviceController } from '../../../controller/devices.controller';
import { DeviceEntity } from '../entities/device.entity';
import { DevicesRepository } from '../repositories/devices.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceEntity])],
  providers: [DeviceService, DevicesRepository],
  controllers: [DeviceController],
})
export class DeviceModule {}
