import { Inject, Injectable } from '@nestjs/common';
import { PulseServiceInterface } from './pulse.service.interface';
import { PulseType } from 'src/domain/pulse-type';
import { DevicesRepository } from 'src/infrastructure/database/repositories/devices.repository';
import { DeviceEntity } from 'src/infrastructure/database/entities/device.entity';

@Injectable()
export class PulseService implements PulseServiceInterface {
  constructor(
    @Inject('DevicesRepository')
    private readonly devicesRepository: DevicesRepository,
  ) {}

  async beat(guid: string, type: string): Promise<DeviceEntity> {
    if (!(type in PulseType)) {
      return Promise.reject('PulseType ' + type + ' does not exist');
    }

    const entity: DeviceEntity = await this.devicesRepository.findOneOrFail(
      guid,
    );

    const tsUnix = new Date(Date.now()).getTime() / 1000;
    entity.lastSeen = tsUnix;
    entity.type = type;
    entity.mailSent = false;

    return this.devicesRepository.save(entity);
  }
}
