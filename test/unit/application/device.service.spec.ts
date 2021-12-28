import { Test, TestingModule } from '@nestjs/testing';
import { DeviceService } from '../../../src/application';
import { DeviceRepository } from '../../../src/infrastructure/database/repositories/devices.repository';
import { mockDeviceRepository } from '../../mock/devices.repository.mock';
import { DeviceEntity } from '../../../src/infrastructure/database/entities/device.entity';
import { Device } from '../../../src/domain';

describe('DeviceService', () => {
  let deviceService: DeviceService;
  let deviceRepositoryMock: jest.Mocked<DeviceRepository>;

  const deviceEntities: DeviceEntity[] = [
    {
      guid: 'ede88b30-1ba0-431a-9775-acfdf2ac0f57',
      description: 'client-1',
      lastSeen: undefined,
      maxTimeout: 15,
      alertSentMail: false,
      alertSentDiscord: false,
      enabled: true,
    },
    {
      guid: '2d15c391-6646-44f3-8ed7-604ab60cddb5',
      description: 'client-2',
      lastSeen: undefined,
      maxTimeout: 60,
      alertSentMail: false,
      alertSentDiscord: false,
      enabled: true,
    },
  ];

  const devices: Device[] = [
    new Device('client-1', 15, false, false),
    new Device('client-2', 60, false, false),
  ];

  beforeAll(() => {
    deviceRepositoryMock = mockDeviceRepository();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        DeviceService,
        {
          provide: 'DeviceRepository',
          useValue: deviceRepositoryMock,
        },
      ],
    }).compile();
    deviceService = module.get<DeviceService>(DeviceService);
  });

  describe('getAllDevices', () => {
    it('should return all devices found in database', async () => {
      deviceRepositoryMock.findAll.mockResolvedValueOnce(deviceEntities);

      const result = await deviceService.getAllDevices();
      expect(result).toEqual(devices);
    });

    it('should fail to get all devices from database due to unknown error', async () => {
      const err = new Error('unknown error');
      deviceRepositoryMock.findAll.mockRejectedValueOnce(err);

      await expect(async () => {
        await deviceService.getAllDevices();
      }).rejects.toThrow(Error);
    });
  });
});
