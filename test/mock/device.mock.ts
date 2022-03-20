import { PulseType } from '../../src/domain';
import { DeviceEntity } from '../../src/infrastructure/database/entities/device.entity';

export const deviceMock: DeviceEntity[] = [
  {
    guid: 'ede88b30-1ba0-431a-9775-acfdf2ac0f57',
    description: 'client-1',
    maxTimeout: 15,
    lastSeen: 1647550435,
    type: PulseType.BEAT,
    alertSentMail: false,
    alertSentDiscord: true,
    enabled: true,
  },
  {
    guid: '2d15c391-6646-44f3-8ed7-604ab60cddb5',
    description: 'client-2',
    maxTimeout: 60,
    alertSentMail: false,
    alertSentDiscord: false,
    enabled: true,
  },
];
