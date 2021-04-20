import { Controller, Get, Inject } from '@nestjs/common';
import { AppServiceInterface } from '../application/app.service.interface';

@Controller()
export class AppController {
  private appService: AppServiceInterface;

  constructor(@Inject('AppService') appService: AppServiceInterface) {
    this.appService = appService;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
