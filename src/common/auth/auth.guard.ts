import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerService } from '../../logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly loggerService: LoggerService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.loggerService.info(`Guard: Checking authentication`);
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    if (apiKey !== 'SECRET') {
      return false;
    }
    this.loggerService.info(`Guard: Passed authentication`);
    return true;
  }
}
