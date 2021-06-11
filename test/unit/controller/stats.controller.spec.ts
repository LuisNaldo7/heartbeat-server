import { Test, TestingModule } from '@nestjs/testing';
import { StatsService } from 'src/application/stats.service';
import { mockStatsService } from '../../mock';
import { StatsController } from '../../../src/controller/stats.controller';

describe('StatsController', () => {
  let controller: StatsController;
  let statsServiceMock: jest.Mocked<StatsService>;

  beforeAll(() => {
    statsServiceMock = mockStatsService();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [
        {
          provide: 'StatsService',
          useValue: statsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<StatsController>(StatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
