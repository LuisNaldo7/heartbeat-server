import { Test, TestingModule } from '@nestjs/testing';
import { DeviceService } from '../../../src/application';
import { DevicesRepository } from '../../../src/infrastructure/database/repositories/devices.repository';
import { mockDevicesRepository } from '../../mock/devices.repository.mock';
import { DeviceEntity } from '../../../src/infrastructure/database/entities/device.entity';

describe('DeviceService', () => {
  let deviceService: DeviceService;
  let deviceRepositoryMock: jest.Mocked<DevicesRepository>;

  const devices: DeviceEntity[] = [
    {
      guid: 'ede88b30-1ba0-431a-9775-acfdf2ac0f57',
      description: 'client-1',
      maxTimeout: 15,
      mailSent: false,
      enabled: true,
    },
    {
      guid: '2d15c391-6646-44f3-8ed7-604ab60cddb5',
      description: 'client-2',
      maxTimeout: 60,
      mailSent: false,
      enabled: true,
    },
  ];

  beforeAll(() => {
    deviceRepositoryMock = mockDevicesRepository();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        DeviceService,
        {
          provide: 'DevicesRepository',
          useValue: deviceRepositoryMock,
        },
      ],
    }).compile();
    deviceService = module.get<DeviceService>(DeviceService);
  });

  describe('getAllDevices', () => {
    it('should return all devices found in database', async () => {
      deviceRepositoryMock.findAll.mockResolvedValueOnce(devices);

      const result = await deviceService.getAllDevices();
      expect(result).toBe(devices);
    });
  });
});
