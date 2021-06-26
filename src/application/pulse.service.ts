import { Injectable } from '@nestjs/common';
import { PulseServiceInterface } from './pulse.service.interface';
import * as mysql from 'mysql';
import { getConnection } from '../sql';
import { PulseType } from 'src/pulse-type';

let con: mysql.Connection;

function updateDevice(guid: string, type: string): Promise<void> {
  const MAIL_SENT = false;
  const TS_UNIX = new Date(Date.now()).getTime() / 1000;

  return new Promise((resolve, reject) => {
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
      TS_UNIX +
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
        reject('internal database error');
      }

      if (result) {
        if (result.changedRows == 1) {
          resolve();
        } else if (result.changedRows == 0) {
          reject('GUID ' + guid + ' not found');
        } else {
          reject('unknown error');
        }
      }
    });
  });
}

@Injectable()
export class PulseService implements PulseServiceInterface {
  async beat(guid: string, type: string): Promise<void> {
    if (!(type in PulseType)) {
      return Promise.reject('PulseType ' + type + ' does not exist');
    }

    return await updateDevice(guid, type);
  }
}
