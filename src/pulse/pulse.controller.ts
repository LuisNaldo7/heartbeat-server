import { Controller, Get, Param } from '@nestjs/common';
import * as mysql from 'mysql';
import { getConnection } from '../sql';

let con: mysql.Connection;

function updateDevice(guid: string, type: string) {
  const MAIL_SENT: Boolean = false;
  let tsUnix = new Date(Date.now()).getTime() / 1000;

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
        console.log(3);
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
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
