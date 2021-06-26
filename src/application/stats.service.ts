import { Injectable } from '@nestjs/common';
import { StatsServiceInterface } from './stats.service.interface';
import * as mysql from 'mysql';
import { getConnection } from '../sql';

let con: mysql.Connection;

function getDevices(): Promise<string> {
  if (
    con == null ||
    con.state == 'disconnected' ||
    con.state == 'protocol_error'
  ) {
    con = getConnection();
  }

  return new Promise((resolve, reject) => {
    con.query('SELECT * FROM devices', (err, result) => {
      if (err) {
        console.error(err);
        reject('internal database error');
      }
      resolve(result);
    });
  });
}

@Injectable()
export class StatsService implements StatsServiceInterface {
  async getDevices(): Promise<string> {
    return getDevices();
  }
}
