import { Injectable } from '@nestjs/common';
import { StatsServiceInterface } from './stats.service.interface';
import * as mysql from 'mysql';
import { getConnection } from '../sql';
require('dotenv').config();

let con: mysql.Connection;

function getDevices(): Promise<string> {
  try {
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
          reject(err);
        }
        resolve(result);
      });
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

@Injectable()
export class StatsService implements StatsServiceInterface {
  async getDevices(): Promise<string> {
    return getDevices();
  }
}
