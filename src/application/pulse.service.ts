import { Injectable } from '@nestjs/common';
import { PulseServiceInterface } from './pulse.service.interface';
import * as mysql from 'mysql';
import { getConnection } from '../sql';

let con: mysql.Connection;

function updateDevice(guid: string, type: string) {
  const MAIL_SENT = false;
  const tsUnix = new Date(Date.now()).getTime() / 1000;

  try {
    if (
      con == null ||
      con.state == 'disconnected' ||
      con.state == 'protocol_error'
    ) {
      con = getConnection();
    }

    const sql =
      'UPDATE devices ' +
      'SET ' +
      "last_seen = '" +
      tsUnix +
      "', " +
      "type = '" +
      type +
      "', " +
      'mail_sent = ' +
      MAIL_SENT +
      ' ' +
      'WHERE ' +
      "guid = '" +
      guid +
      "';";

    con.query(sql, (err, result) => {
      if (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

@Injectable()
export class PulseService implements PulseServiceInterface {
  beat(guid: string): void {
    updateDevice(guid, 'BEAT');
  }

  rise(guid: string): void {
    updateDevice(guid, 'BOOT');
  }

  die(guid: string): void {
    updateDevice(guid, 'SHUTDOWN');
  }
}
