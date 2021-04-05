import { Controller, Get, Param } from '@nestjs/common';
const mysql = require('mysql');

let con = mysql.createConnection({
  host: process.env.HEARTBEAT_DB_HOST,
  port: parseInt(process.env.HEARTBEAT_DB_PORT || '3306'),
  ssl: JSON.parse(process.env.HEARTBEAT_DB_SSL || 'true'),
  user: process.env.HEARTBEAT_DB_USER,
  password: process.env.HEARTBEAT_DB_PASSWORD,
  database: process.env.HEARTBEAT_DB_DATABASE,
});

function updateDevice(guid: string, type: string) {
  const MAIL_SENT: Boolean = false;
  let tsUnix = new Date(Date.now()).getTime() / 1000;

  const sql =
    'UPDATE devices ' +
    'SET ' +
    "last_seen = '" +
    tsUnix +
    "', " +
    "type = '" +
    type +
    "', " +
    "mail_sent = " +
    MAIL_SENT +
    " " +
    'WHERE ' +
    "guid = '" +
    guid +
    "';";

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
}

@Controller('pulse')
export class PulseController {
  @Get('beat/:guid')
  async beat(@Param('guid') guid) {
    updateDevice(guid, 'BEAT');
  }

  @Get('boot/:guid')
  async rise(@Param('guid') guid) {
    updateDevice(guid, 'BOOT');
  }

  @Get('shutdown/:guid')
  async die(@Param('guid') guid) {
    updateDevice(guid, 'SHUTDOWN');
  }
}
