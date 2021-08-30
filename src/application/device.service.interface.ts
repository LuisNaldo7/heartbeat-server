import { DeviceEntity } from 'src/infrastructure/database/entities/device.entity';

export interface DeviceServiceInterface {
  getAllDevices(): Promise<DeviceEntity[]>;
}
