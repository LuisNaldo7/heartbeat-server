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

function updateDevice(id: string, type: string) {
  let date = new Date().toISOString();
  date = date.replace('Z', '');

  const sql =
    'UPDATE devices ' +
    'SET ' +
    "last_seen = '" +
    date +
    "', " +
    "type = '" +
    type +
    "' " +
    'WHERE ' +
    "guid = '" +
    id +
    "';";

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
}

@Controller('pulse')
export class PulseController {
  @Get('beat/:id')
  async beat(@Param('id') id) {
    updateDevice(id, 'BEAT');
  }

  @Get('boot/:id')
  async rise(@Param('id') id) {
    updateDevice(id, 'BOOT');
  }

  @Get('shutdown/:id')
  async die(@Param('id') id) {
    updateDevice(id, 'SHUTDOWN');
  }
}
