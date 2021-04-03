import { Controller, Get } from '@nestjs/common';
const path = require('path');
const mysql = require('mysql');
const config = require(process.env.CONFIG_FILE);

const dbCon = mysql.createConnection({
  host: config.db.host,
  port: config.db.port,
  ssl: config.db.ssl,
  user: config.db.user,
  password: config.db.pw,
  database: config.db.database,
});

@Controller('stats')
export class StatsController {
  @Get('devices')
  async getDevicesx(): Promise<string> {
    return new Promise((resolve, reject) => {
      dbCon.query('SELECT * FROM devices', function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
}
