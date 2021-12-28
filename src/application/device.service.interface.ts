import { Device } from 'src/domain';

export interface DeviceServiceInterface {
  getAllDevices(): Promise<Device[]>;
}
