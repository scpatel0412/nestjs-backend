import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
@Injectable()
export class AppService {
  constructor(private http: HttpService) {}
  getHello(): Promise<any> {
    return this.http
      .get(
        'https://api.unsplash.com/photos/?client_id=yJaO89Ni3g-ruhXTe3o37O55iR1Yxy5R3LQzNyZ0p_Q',
      )
      .toPromise()
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
}
