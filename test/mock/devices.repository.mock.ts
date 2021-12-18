import { DeviceRepository } from 'src/infrastructure/database/repositories/devices.repository';

export function mockDeviceRepository(): jest.Mocked<DeviceRepository> {
  return {
    findOneOrFail: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
  } as unknown as jest.Mocked<DeviceRepository>;
}
