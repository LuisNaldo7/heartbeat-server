import { TimeService } from './';

export class Device {
  private readonly timeService: TimeService;

  public readonly description: string;
  public lastSeen?: number;
  public readonly maxTimeout: number;
  public alertSentMail: boolean;
  public alertSentDiscord: boolean;

  constructor(
    description: string,
    maxTimeout: number,
    alertSentMail: boolean,
    alertSentDiscord: boolean,
  ) {
    this.timeService = new TimeService();

    this.description = description;
    this.maxTimeout = maxTimeout;
    this.alertSentMail = alertSentMail;
    this.alertSentDiscord = alertSentDiscord;
  }

  public maxTimeoutExceeded(): boolean {
    if (!this.lastSeen) return true;

    return (
      this.lastSeen + this.maxTimeout <
      this.timeService.getCurrentUnixTimeSeconds()
    );
  }
}
