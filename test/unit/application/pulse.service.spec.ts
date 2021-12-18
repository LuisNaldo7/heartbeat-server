import { Test, TestingModule } from '@nestjs/testing';
import { PulseService } from '../../../src/application';
import { DeviceRepository } from '../../../src/infrastructure/database/repositories/devices.repository';
import { mockDeviceRepository } from '../../mock/devices.repository.mock';
import { DeviceEntity } from '../../../src/infrastructure/database/entities/device.entity';
import { PulseType } from '../../../src/domain';
import { EntityNotFoundError } from 'typeorm';

describe('PulseService', () => {
  let pulseService: PulseService;
  let deviceRepositoryMock: jest.Mocked<DeviceRepository>;

  const device: DeviceEntity = {
    guid: 'ede88b30-1ba0-431a-9775-acfdf2ac0f57',
    description: 'client-1',
    maxTimeout: 15,
    alertSentMail: false,
    alertSentDiscord: false,
    enabled: true,
  };

  beforeAll(() => {
    deviceRepositoryMock = mockDeviceRepository();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        PulseService,
        {
          provide: 'DeviceRepository',
          useValue: deviceRepositoryMock,
        },
      ],
    }).compile();
    pulseService = module.get<PulseService>(PulseService);
  });

  describe('beat', () => {
    it('should update a device and return the expected DeviceEntity', async () => {
      const deviceId = 'ede88b30-1ba0-431a-9775-acfdf2ac0f57';
      const pulseType = PulseType.BEAT;

      deviceRepositoryMock.findOneOrFail.mockResolvedValueOnce(device);
      deviceRepositoryMock.save.mockResolvedValueOnce(device);

      const result = await pulseService.beat(deviceId, PulseType.BEAT);
      expect(result.guid).toBe(deviceId);
      expect(result.lastSeen).toBeGreaterThan(0);
      expect(result.type).toBe(pulseType);
      expect(result.alertSentDiscord).toBe(false);
      expect(result.alertSentDiscord).toBe(false);
    });

    it('should fail to update a device due to unknown device id', async () => {
      const deviceId = '12345678-1ba0-431a-9775-acfdf2ac0f57';

      const err = new EntityNotFoundError(DeviceEntity, deviceId);
      deviceRepositoryMock.findOneOrFail.mockRejectedValueOnce(err);

      await expect(async () => {
        await pulseService.beat(deviceId, PulseType.BEAT);
      }).rejects.toThrow(EntityNotFoundError);
    });
  });
});
