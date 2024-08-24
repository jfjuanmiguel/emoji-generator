import { BadRequestException } from '@nestjs/common';
import { EmojiValidationPipe } from './emoji-validation.pipe';

describe('EmojiValidationPipe', () => {
  const emojiValidationPipe = new EmojiValidationPipe();

  it('should be defined', () => {
    expect(new EmojiValidationPipe()).toBeDefined();
  });

  it(`should return undefined when no value is passed`, () => {
    const result = emojiValidationPipe.transform();
    expect(result).toBeUndefined();
  });

  it(`should throw an error when value is not a number`, () => {
    const result = () => emojiValidationPipe.transform('INVALID');
    expect(result).toThrow(BadRequestException);
  });

  it(`should throw an error when value is out of range`, () => {
    const result = () => emojiValidationPipe.transform(`99`);
    expect(result).toThrow(BadRequestException);
  });

  it(`should return a number when value is valid`, () => {
    const result = emojiValidationPipe.transform(`5`);
    expect(result).toBe(5);
  });
});
