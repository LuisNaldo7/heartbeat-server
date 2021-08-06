import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceEntity } from '../entities/device.entity';

@Injectable()
export class DevicesRepository {
  constructor(
    @InjectRepository(DeviceEntity)
    private devicesRepository: Repository<DeviceEntity>,
  ) {}

  findAll(): Promise<DeviceEntity[]> {
    return this.devicesRepository.find();
  }

  findOneOrFail(guid: string): Promise<DeviceEntity> {
    return this.devicesRepository.findOneOrFail(guid);
  }

  save(entity: DeviceEntity): Promise<DeviceEntity> {
    return this.devicesRepository.save(entity);
  }
}
