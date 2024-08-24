import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  it(`shoud be defined`, () => {
    expect(appService).toBeDefined();
  });

  it(`should return a random emoji`, () => {
    // arrange
    const emojis = appService.getEmojis();

    // act
    const randomEmoji = appService.getEmoji();

    // assert
    const isValidEmoji = emojis.some((emoji) => emoji === randomEmoji);
    expect(isValidEmoji).toBe(true);
  });
});
