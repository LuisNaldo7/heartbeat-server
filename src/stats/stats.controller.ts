import { Controller, Get } from '@nestjs/common';
const path = require('path');
const nodemailer = require('nodemailer');
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
  @Get('mail')
  async mail(): Promise<boolean> {
    const transporter = nodemailer.createTransport({
      service: config.mail.host,
      requireTLS: config.mail.require_tls,
      auth: {
        user: config.mail.from,
        pass: config.mail.pw,
      },
    });

    const mailOptions = {
      from: config.mail.from,
      to: config.mail.to,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!',
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (err, result) {
        if (err) {
          reject(err);
        }
        console.log('Email sent: ' + result.response);
        resolve(result);
      });
    });
  }

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
