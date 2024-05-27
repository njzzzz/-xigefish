import { expect,describe,it } from 'vitest';
import {
  emailValidator,
} from '../src/form-validator';

describe('emailValidator', () => {
  it('should validate valid email address', () => {
    const rule = {};
    const value = 'example@example.com';

    const callback = (error) => {
      expect(error).toBe(undefined); // 预期没有错误
    };

    emailValidator(rule, value, callback);
  });

  it('should validate empty email address', () => {
    const rule = {};
    const value = '';

    const callback = (error) => {
      expect(error).toBe(undefined); // 预期没有错误，因为允许为空
    };

    emailValidator(rule, value, callback);
  });

  it('should validate invalid email address', () => {
    const rule = {};
    const value = 'invalid-email';

    const callback = (error) => {
      expect(error).not.toBe(undefined); // 预期有错误
    };

    emailValidator(rule, value, callback);
  });

});


