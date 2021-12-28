import { DeviceService } from '../../src/application';

export function mockDeviceService(): jest.Mocked<DeviceService> {
  return {
    getDevices: jest.fn(),
  } as unknown as jest.Mocked<DeviceService>;
}
