import { Inject, Injectable } from '@nestjs/common';
import { DeviceServiceInterface } from './device.service.interface';
import { DeviceEntity } from 'src/infrastructure/database/entities/device.entity';
import { DeviceRepositoryInterface } from './devices.repository.interface';

@Injectable()
export class DeviceService implements DeviceServiceInterface {
  constructor(
    @Inject('DeviceRepository')
    private readonly deviceRepository: DeviceRepositoryInterface,
  ) {}

  async getAllDevices(): Promise<DeviceEntity[]> {
    try {
      return await this.deviceRepository.findAll();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
