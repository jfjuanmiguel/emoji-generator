import { AuthGuard } from './auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { LoggerService } from '../../logger.service';

describe('AuthGuard', () => {
  const authGuard = new AuthGuard(new LoggerService());

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it(`should return true with valid api key header`, () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            'x-api-key': 'SECRET',
          },
        }),
      }),
    });
    const result = authGuard.canActivate(context);
    expect(result).toBe(true);
  });

  it(`should return false with invalid api key header`, () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            'x-api-key': 'INVALID',
          },
        }),
      }),
    });
    const result = authGuard.canActivate(context);
    expect(result).toBe(false);
  });
});
