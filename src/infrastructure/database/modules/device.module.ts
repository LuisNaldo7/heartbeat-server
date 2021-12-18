import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceService } from '../../../application/device.service';
import { DeviceController } from '../../../controller/device.controller';
import { DeviceEntity } from '../entities/device.entity';
import { DeviceRepository } from '../repositories/devices.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceEntity])],
  providers: [
    {
      provide: 'DeviceRepository',
      useClass: DeviceRepository,
    },
    {
      provide: 'DeviceService',
      useClass: DeviceService,
    },
  ],
  controllers: [DeviceController],
})
export class DeviceModule {}
