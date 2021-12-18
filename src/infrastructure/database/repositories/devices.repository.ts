import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceRepositoryInterface } from 'src/application';
import { Repository } from 'typeorm';
import { DeviceEntity } from '../entities/device.entity';

@Injectable()
export class DeviceRepository implements DeviceRepositoryInterface {
  constructor(
    @InjectRepository(DeviceEntity)
    private deviceRepository: Repository<DeviceEntity>,
  ) {}

  findAll(): Promise<DeviceEntity[]> {
    return this.deviceRepository.find();
  }

  findOneOrFail(guid: string): Promise<DeviceEntity> {
    return this.deviceRepository.findOneOrFail(guid);
  }

  save(entity: DeviceEntity): Promise<DeviceEntity> {
    return this.deviceRepository.save(entity);
  }
}
