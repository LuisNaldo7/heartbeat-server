import { Inject, Injectable } from '@nestjs/common';
import { DeviceServiceInterface } from './device.service.interface';
import { DeviceEntity } from 'src/infrastructure/database/entities/device.entity';
import { DevicesRepository } from 'src/infrastructure/database/repositories/devices.repository';

@Injectable()
export class DeviceService implements DeviceServiceInterface {
  constructor(
    @Inject('DevicesRepository')
    private readonly devicesRepository: DevicesRepository,
  ) {}

  async getAllDevices(): Promise<DeviceEntity[]> {
    try {
      return this.devicesRepository.findAll();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
