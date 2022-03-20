import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PulseService } from '../application/pulse.service';
import { PulseController } from '../controller/pulse.controller';
import { DeviceEntity } from '../infrastructure/database/entities/device.entity';
import { DeviceRepository } from '../infrastructure/database/repositories/devices.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceEntity])],
  providers: [
    {
      provide: 'DeviceRepository',
      useClass: DeviceRepository,
    },
    {
      provide: 'PulseService',
      useClass: PulseService,
    },
  ],
  controllers: [PulseController],
})
export class PulseModule {}
