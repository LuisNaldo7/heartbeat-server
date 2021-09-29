import { DevicesRepository } from 'src/infrastructure/database/repositories/devices.repository';

export function mockDevicesRepository(): jest.Mocked<DevicesRepository> {
  return {
    findOneOrFail: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
  } as unknown as jest.Mocked<DevicesRepository>;
}
