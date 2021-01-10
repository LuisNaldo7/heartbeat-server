import { Controller, Get, Param } from '@nestjs/common';
const mysql = require('mysql');
const config = require(process.env.CONFIG_FILE);

const dbCon = mysql.createConnection({
  host: config.db.host,
  port: config.db.port,
  ssl: config.db.ssl,
  user: config.db.user,
  password: config.db.pw,
  database: config.db.database
});

function updateDevice(id: string, type: string) {
  
  var date = new Date().toISOString();
  date = date.replace("Z", "");

  var sql = "UPDATE devices " + 
            "SET " + 
              "last_seen = '" + date + "', " + 
              "type = '" + type + "' " +
            "WHERE " +
            "guid = '" + id + "';";

  dbCon.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
  });

}

@Controller('pulse')
export class PulseController {

  @Get('beat/:id')
  async beat(@Param('id') id) {  
    updateDevice(id, "BEAT");
  }

  @Get('boot/:id')
  async rise(@Param('id') id) {
    updateDevice(id, "BOOT");
  }

  @Get('shutdown/:id')
  async die(@Param('id') id) {
    updateDevice(id, "SHUTDOWN");
  }

}