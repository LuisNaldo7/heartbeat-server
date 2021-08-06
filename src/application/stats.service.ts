import { Inject, Injectable } from '@nestjs/common';
import { StatsServiceInterface } from './stats.service.interface';
import { DeviceEntity } from 'src/infrastructure/database/entities/device.entity';
import { DevicesRepository } from 'src/infrastructure/database/repositories/devices.repository';

@Injectable()
export class StatsService implements StatsServiceInterface {
  constructor(
    @Inject('DevicesRepository')
    private readonly devicesRepository: DevicesRepository,
  ) {}

  async getAllDevices(): Promise<DeviceEntity[]> {
    return this.devicesRepository.findAll();
  }
}
