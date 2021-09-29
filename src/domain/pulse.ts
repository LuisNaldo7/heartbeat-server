import { PulseType } from '.';

export class Pulse {
  public readonly deviceId: string;
  public readonly lastSeen: Date;
  public readonly lastSeenUnix: number;
  public readonly type: PulseType;

  constructor(deviceId: string, timeStamp: Date, type: PulseType) {
    this.deviceId = deviceId;
    this.lastSeen = timeStamp;
    this.type = type;

    this.lastSeenUnix = timeStamp.getTime() / 1000;
  }
}
