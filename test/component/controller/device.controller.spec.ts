import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeviceEntity } from '../../../src/infrastructure/database/entities/device.entity';
import { deviceMock } from '../../mock/device.mock';
import { DeviceModule } from '../../../src/infrastructure/database/modules/device.module';

describe('DeviceController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DeviceModule],
    })
      .overrideProvider(getRepositoryToken(DeviceEntity))
      .useValue({
        find: (): DeviceEntity[] => deviceMock,
      })
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('getDevices endpoint', () => {
    it('/devices (GET) successfully returns devices', async () => {
      const expectedResult = [
        {
          description: deviceMock[0].description,
          lastSeen: deviceMock[0].lastSeen,
          maxTimeout: deviceMock[0].maxTimeout,
          maxTimeoutExceeded: true,
          alertSentMail: deviceMock[0].alertSentMail,
          alertSentDiscord: deviceMock[0].alertSentDiscord,
        },
        {
          description: deviceMock[1].description,
          maxTimeout: deviceMock[1].maxTimeout,
          maxTimeoutExceeded: true,
          alertSentMail: deviceMock[1].alertSentMail,
          alertSentDiscord: deviceMock[1].alertSentDiscord,
        },
      ];

      await request(app.getHttpServer())
        .get('/devices')
        .expect(200)
        .expect((response) => {
          expect(response.body.devices).toEqual(expectedResult);
        });
    });
  });
});
