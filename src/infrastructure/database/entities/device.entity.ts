import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('device')
export class DeviceEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'guid',
  })
  guid: string;
  @Column({
    name: 'description',
  })
  description: string;
  @Column({
    name: 'max_timeout',
    default: 60,
  })
  maxTimeout: number;
  @Column({
    name: 'last_seen',
    default: null,
  })
  lastSeen?: number;
  @Column({
    name: 'type',
    default: null,
  })
  type?: string;
  @Column({
    name: 'alert_sent_mail',
    default: false,
  })
  alertSentMail: boolean;
  @Column({
    name: 'alert_sent_discord',
    default: false,
  })
  alertSentDiscord: boolean;
  @Column({
    name: 'enabled',
    default: false,
  })
  enabled?: boolean;

  constructor(
    guid: string,
    description: string,
    maxTimeout: number,
    alertSentMail: boolean,
    alertSentDiscord: boolean,
  ) {
    this.guid = guid;
    this.description = description;
    this.maxTimeout = maxTimeout;
    this.alertSentMail = alertSentMail;
    this.alertSentDiscord = alertSentDiscord;
  }
}
