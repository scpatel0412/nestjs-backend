import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AllowUnauthorized } from './auth/decorators/allow-unauthorized.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @AllowUnauthorized()
  @Get()
  getHello(): any {
    return this.appService.getHello();
  }
  @Get('/random')
  getRandom(): any {
    return this.appService.getRandom();
  }
}
