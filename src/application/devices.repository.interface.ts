import { DeviceEntity } from 'src/infrastructure/database/entities/device.entity';

export interface DevicesRepositoryInterface {
  findAll(): Promise<DeviceEntity[]>;
  findOneOrFail(guid: string): Promise<DeviceEntity>;
  save(entity: DeviceEntity): Promise<DeviceEntity>;
}
