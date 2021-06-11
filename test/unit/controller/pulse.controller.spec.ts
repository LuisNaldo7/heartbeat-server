import { Test, TestingModule } from '@nestjs/testing';
import { PulseService } from 'src/application/pulse.service';
import { mockPulseService } from '../../mock';
import { PulseController } from '../../../src/controller/pulse.controller';

describe('PulseController', () => {
  let controller: PulseController;
  let pulseServiceMock: jest.Mocked<PulseService>;

  beforeAll(() => {
    pulseServiceMock = mockPulseService();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PulseController],
      providers: [
        {
          provide: 'PulseService',
          useValue: pulseServiceMock,
        },
      ],
    }).compile();

    controller = module.get<PulseController>(PulseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
