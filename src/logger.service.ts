import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  info(log: string) {
    console.log(log);
  }
}
