import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getStatus() {
    return {
      name: 'athenaeum-nest',
      status: 'ok',
    };
  }
}
