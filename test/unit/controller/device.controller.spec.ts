import { Test, TestingModule } from '@nestjs/testing';
import { DeviceController } from '../../../src/controller/device.controller';
import { DeviceService } from 'src/application/device.service';
import { mockDeviceService } from '../../mock';

describe('DeviceController', () => {
  let controller: DeviceController;
  let deviceServiceMock: jest.Mocked<DeviceService>;

  beforeAll(() => {
    deviceServiceMock = mockDeviceService();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceController],
      providers: [
        {
          provide: 'DeviceService',
          useValue: deviceServiceMock,
        },
      ],
    }).compile();

    controller = module.get<DeviceController>(DeviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
