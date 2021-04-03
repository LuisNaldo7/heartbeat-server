import { Controller, Get } from '@nestjs/common';
const path = require('path');
const mysql = require('mysql');

let con = mysql.createConnection({
  host: process.env.HEARTBEAT_DB_HOST,
  port: parseInt(process.env.HEARTBEAT_DB_PORT || '3306'),
  ssl: JSON.parse(process.env.HEARTBEAT_DB_SSL || 'true'),
  user: process.env.HEARTBEAT_DB_USER,
  password: process.env.HEARTBEAT_DB_PASSWORD,
  database: process.env.HEARTBEAT_DB_DATABASE,
});

@Controller('stats')
export class StatsController {
  @Get('devices')
  async getDevicesx(): Promise<string> {
    return new Promise((resolve, reject) => {
      con.query('SELECT * FROM devices', function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
}
