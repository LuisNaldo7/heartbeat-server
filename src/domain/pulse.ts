import { PulseType, TimeService } from './';

export class Pulse {
  private readonly timeService: TimeService;

  public readonly deviceId: string;
  public readonly lastSeen: Date;
  public readonly lastSeenUnix: number;
  public readonly type: PulseType;

  constructor(deviceId: string, timeStamp: Date, type: PulseType) {
    this.timeService = new TimeService();

    this.deviceId = deviceId;
    this.lastSeen = timeStamp;
    this.type = type;

    this.lastSeenUnix = this.timeService.getUnixTimeSeconds(timeStamp);
  }
}
