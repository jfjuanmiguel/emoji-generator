import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: () => void) {
    console.log(`Middleware: Logging request: ${req.url}`);
    next();
  }
}
