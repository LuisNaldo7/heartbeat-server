import { DeviceEntity } from 'src/infrastructure/database/entities/device.entity';

export interface PulseServiceInterface {
  beat(deviceId: string, type: string): Promise<DeviceEntity>;
}
