import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      status: '201',
      message: 'relocate yourself to /graphql',
    };
  }
}
