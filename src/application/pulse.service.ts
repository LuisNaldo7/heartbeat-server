import { Inject, Injectable } from '@nestjs/common';
import { DeviceEntity } from '../infrastructure/database/entities/device.entity';
import { Pulse, PulseType } from '../domain';
import { DevicesRepositoryInterface, PulseServiceInterface } from '.';

@Injectable()
export class PulseService implements PulseServiceInterface {
  constructor(
    @Inject('DevicesRepository')
    private readonly devicesRepository: DevicesRepositoryInterface,
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
