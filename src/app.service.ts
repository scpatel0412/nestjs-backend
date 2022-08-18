import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
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
  getRandom(): Promise<any> {
    return this.http
      .get(
        'https://api.unsplash.com/photos/random?count=10&client_id=yJaO89Ni3g-ruhXTe3o37O55iR1Yxy5R3LQzNyZ0p_Q',
      )
      .toPromise()
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
  getWelcomePage(): string {
    const imag1 =
      'https://unsplash.com/photos/RN6ts8IZ4_0/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Nnx8YmVhY2h8ZW58MHx8fHwxNjYwODE5MDA0&force=true';
    return `<!DOCTYPE html><html><head><title>Nebula</title></head><body style="background-image: url(${imag1}); background-size:cover; color:white; hieght=100vh; width=100vw; align-items:center; text-align:center"><h1 style="color:white">Welcome to Our backend</h1><p>Take some chill time and see beach......</p><p>Braise yourself up .....</p></body></html>`;
  }
}
