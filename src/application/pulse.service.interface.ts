export interface PulseServiceInterface {
  beat(guid: string): void;
  rise(guid: string): void;
  die(guid: string): void;
}
