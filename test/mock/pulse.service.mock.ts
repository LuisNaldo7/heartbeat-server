import { PulseService } from '../../src/application/pulse.service';

export function mockPulseService(): jest.Mocked<PulseService> {
  return ({
    beat: jest.fn(),
    rise: jest.fn(),
    die: jest.fn(),
  } as unknown) as jest.Mocked<PulseService>;
}
