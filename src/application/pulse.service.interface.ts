export interface PulseServiceInterface {
  beat(guid: string, type: string): Promise<void>;
}
