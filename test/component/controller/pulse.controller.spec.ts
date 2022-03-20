import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeviceEntity } from '../../../src/infrastructure/database/entities/device.entity';
import { deviceMock } from '../../mock/device.mock';
import { PulseModule } from '../../../src/modules/pulse.module';
import { PulseType } from '../../../src/domain';
import { EntityNotFoundError } from 'typeorm';

describe('PulseController', () => {
  let app: INestApplication;

  afterEach(async () => {
    await app.close();
  });

  describe('beat endpoint', () => {
    it("/pulse/beat (POST) successfully saves a device's state", async () => {
      const module = await Test.createTestingModule({
        imports: [PulseModule],
      })
        .overrideProvider(getRepositoryToken(DeviceEntity))
        .useValue({
          findOneOrFail: (): DeviceEntity => deviceMock[0],
          save: (): DeviceEntity => deviceMock[0],
        })
        .compile();

      app = module.createNestApplication();
      await app.init();

      await request(app.getHttpServer())
        .post('/pulse')
        .send({
          deviceId: deviceMock[0].guid,
          type: PulseType.BEAT,
        })
        .expect(200);
    });

    it('/pulse/beat (POST) fails to save a state due to unknown device id', async () => {
      const unknownDeviceId = '12345678-1ba0-431a-9775-acfdf2ac0f57';
      const module = await Test.createTestingModule({
        imports: [PulseModule],
      })
        .overrideProvider(getRepositoryToken(DeviceEntity))
        .useValue({
          findOneOrFail: (): EntityNotFoundError => {
            throw new EntityNotFoundError(DeviceEntity, null);
          },
          save: (): DeviceEntity => deviceMock[0],
        })
        .compile();

      app = module.createNestApplication();
      await app.init();

      await request(app.getHttpServer())
        .post('/pulse')
        .send({
          deviceId: unknownDeviceId,
          type: PulseType.BEAT,
        })
        .expect(404);
    });
  });
});
