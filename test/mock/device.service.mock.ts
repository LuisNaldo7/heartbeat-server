import { DeviceService } from '../../src/application/device.service';

export function mockDeviceService(): jest.Mocked<DeviceService> {
  return {
    getDevices: jest.fn(),
  } as unknown as jest.Mocked<DeviceService>;
}
