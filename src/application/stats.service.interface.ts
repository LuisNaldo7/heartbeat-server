import { DeviceEntity } from 'src/infrastructure/database/entities/device.entity';

export interface StatsServiceInterface {
  getAllDevices(): Promise<DeviceEntity[]>;
}
