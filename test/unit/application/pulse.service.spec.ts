import { Test, TestingModule } from '@nestjs/testing';
import { PulseService } from '../../../src/application';
import { DevicesRepository } from '../../../src/infrastructure/database/repositories/devices.repository';
import { mockDevicesRepository } from '../../mock/devices.repository.mock';
import { DeviceEntity } from '../../../src/infrastructure/database/entities/device.entity';
import { PulseType } from '../../../src/domain';

describe('PulseService', () => {
  let pulseService: PulseService;
  let devicesRepositoryMock: jest.Mocked<DevicesRepository>;

  const device: DeviceEntity = {
    guid: 'ede88b30-1ba0-431a-9775-acfdf2ac0f57',
    description: 'client-1',
    maxTimeout: 15,
    mailSent: false,
    enabled: true,
  };

  beforeAll(() => {
    devicesRepositoryMock = mockDevicesRepository();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        PulseService,
        {
          provide: 'DevicesRepository',
          useValue: devicesRepositoryMock,
        },
      ],
    }).compile();
    pulseService = module.get<PulseService>(PulseService);
  });

  describe('beat', () => {
    it('should update a device and return the DeviceEntity', async () => {
      const deviceId = 'ede88b30-1ba0-431a-9775-acfdf2ac0f57';
      const pulseType = PulseType.BEAT;

      devicesRepositoryMock.findOneOrFail.mockResolvedValueOnce(device);
      devicesRepositoryMock.save.mockResolvedValueOnce(device);

      const result = await pulseService.beat(deviceId, pulseType);
      expect(result.guid).toBe(deviceId);
      expect(result.lastSeen).toBeGreaterThan(0);
      expect(result.type).toBe(pulseType);
      expect(result.mailSent).toBe(false);
    });

    // TODO: Add negative tests
  });
});
