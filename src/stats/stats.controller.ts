import { Controller, Get } from '@nestjs/common';
const path = require('path');
import * as mysql from 'mysql';
import { getConnection } from '../sql';

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
  }
}
@Controller('stats')
export class StatsController {
  @Get('devices')
  async devices(): Promise<string> {
    return getDevices();
  }
}
