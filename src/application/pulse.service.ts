import { Inject, Injectable } from '@nestjs/common';
import { PulseServiceInterface } from './pulse.service.interface';
import { PulseType } from 'src/domain/pulse-type';
import { DevicesRepository } from 'src/infrastructure/database/repositories/devices.repository';
import { DeviceEntity } from 'src/infrastructure/database/entities/device.entity';
import { Pulse } from 'src/domain/pulse';

@Injectable()
export class PulseService implements PulseServiceInterface {
  constructor(
    @Inject('DevicesRepository')
    private readonly devicesRepository: DevicesRepository,
  ) {}

  async beat(deviceId: string, type: string): Promise<DeviceEntity> {
    try {
      const entity: DeviceEntity = await this.devicesRepository.findOneOrFail(
        deviceId,
      );

      const pulse = new Pulse(
        deviceId,
        new Date(),
        PulseType[type as keyof typeof PulseType],
      );
      entity.lastSeen = pulse.lastSeenUnix;
      entity.type = pulse.type;
      entity.mailSent = false;

      return this.devicesRepository.save(entity);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
