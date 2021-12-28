export class TimeService {
  public getCurrentUnixTimeSeconds(): number {
    return Math.floor(Date.now() / 1000);
  }

  public getUnixTimeSeconds(date: Date): number {
    return Math.floor(date.getTime() / 1000);
  }
}
