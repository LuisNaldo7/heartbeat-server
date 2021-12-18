import { Inject, Injectable } from '@nestjs/common';
import { DeviceEntity } from '../infrastructure/database/entities/device.entity';
import { Pulse, PulseType } from '../domain';
import { DeviceRepositoryInterface, PulseServiceInterface } from '.';

@Injectable()
export class PulseService implements PulseServiceInterface {
  constructor(
    @Inject('DeviceRepository')
    private readonly deviceRepository: DeviceRepositoryInterface,
  ) {}

  async beat(deviceId: string, type: string): Promise<DeviceEntity> {
    try {
      const entity: DeviceEntity = await this.deviceRepository.findOneOrFail(
        deviceId,
      );

      const pulse = new Pulse(
        deviceId,
        new Date(),
        PulseType[type as keyof typeof PulseType],
      );
      entity.lastSeen = pulse.lastSeenUnix;
      entity.type = pulse.type;
      entity.alertSentMail = false;
      entity.alertSentDiscord = false;

      return this.deviceRepository.save(entity);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
