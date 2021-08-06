import { DeviceEntity } from 'src/infrastructure/database/entities/device.entity';

export interface PulseServiceInterface {
  beat(guid: string, type: string): Promise<DeviceEntity>;
}
