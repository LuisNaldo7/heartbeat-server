import { Inject, Injectable } from '@nestjs/common';
import { Device } from '../domain';
import { DeviceServiceInterface, DeviceRepositoryInterface } from '.';

@Injectable()
export class DeviceService implements DeviceServiceInterface {
  constructor(
    @Inject('DeviceRepository')
    private readonly deviceRepository: DeviceRepositoryInterface,
  ) {}

  async getAllDevices(): Promise<Device[]> {
    try {
      const deviceEntities = await this.deviceRepository.findAll();

      const devices: Device[] = [];
      deviceEntities.forEach((entry) => {
        const device = new Device(
          entry.description,
          entry.maxTimeout,
          entry.alertSentMail,
          entry.alertSentDiscord,
        );
        device.lastSeen = entry.lastSeen;
        devices.push(device);
      });

      return devices;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
