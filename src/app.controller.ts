import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AllowUnauthorized } from './auth/decorators/allow-unauthorized.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @AllowUnauthorized()
  @Get()
  getWelcomePage() {
    return this.appService.getWelcomePage();
  }

  @AllowUnauthorized()
  @Get('/top-10')
  getHello(): any {
    return this.appService.getHello();
  }

  @Get('/random')
  getRandom(): any {
    return this.appService.getRandom();
  }
}
