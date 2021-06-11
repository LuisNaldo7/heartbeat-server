import { StatsService } from '../../src/application/stats.service';

export function mockStatsService(): jest.Mocked<StatsService> {
  return ({
    getDevices: jest.fn(),
  } as unknown) as jest.Mocked<StatsService>;
}
