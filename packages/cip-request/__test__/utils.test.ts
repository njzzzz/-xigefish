import { expect, it, describe } from 'vitest';
import { isSuccess, getFileNameFormHeader, getArgs, getRequestData, getRequestConfig, objectEqual } from '../src/util';

describe('isSuccess', () => {
  it('should return true when the response code matches the success code', () => {
    const res = {
      data: {
        code: 200, // Assuming 200 is the success code
      },
    };

    const options = {
      successCode: 200,
    };

    const result = isSuccess(res, options);

    expect(result).toBe(true);
  });

  it('should return false when the response code does not match the success code', () => {
    const res = {
      data: {
        code: 404, // Assuming 404 is not the success code
      },
    };

    const options = {
      successCode: 200, // Assuming 200 is the success code
    };

    const result = isSuccess(res, options);

    expect(result).toBe(undefined);
  });

  it('should return true when options.noSuccessCode is true, regardless of the response code', () => {
    const res = {
      data: {
        code: 404, // Any code
      },
    };

    const options = {
      noSuccessCode: true,
    };

    const result = isSuccess(res, options);

    expect(result).toBe(true);
  });

  it('should return true when the response code is undefined and options.noSuccessCode is true', () => {
    const res = {
      data: {
        result: 'some result',
      },
    };

    const options = {
      noSuccessCode: true,
    };

    const result = isSuccess(res, options);

    expect(result).toBe(true);
  });
});

describe('getFileNameFormHeader', () => {
  it('should extract the filename from the header disposition', () => {
    const header = 'attachment; filename=example.txt';
    const result = getFileNameFormHeader(header);
    expect(result).toBe('example.txt');
  });

  it('should return null when no filename is found in the header disposition', () => {
    const header = 'attachment; something-else="value"';
    const result = getFileNameFormHeader(header);
    expect(result).toBe(null);
  });

  it('should handle different capitalization and additional attributes', () => {
    const header = 'Attachment; FILENAME=important.pdf';
    const result = getFileNameFormHeader(header);
    expect(result).toBe('important.pdf');
  });

  it('should return null when the header disposition is empty', () => {
    const header = '';
    const result = getFileNameFormHeader(header);
    expect(result).toBe(null);
  });

  it('should return null when the input is null or undefined', () => {
    const result1 = getFileNameFormHeader(null);
    const result2 = getFileNameFormHeader(undefined);
    expect(result1).toBe(null);
    expect(result2).toBe(null);
  });
});

describe('getArgs', () => {
  it('should return an object when the first argument is an object', () => {
    const args = [{ foo: 'bar' }];
    const result = getArgs(args);
    expect(result).toEqual(args[0]);
  });

  it('should parse function arguments correctly', () => {
    const args = ['POST', 'apiName', 'http://example.com', { param1: 'value1' }, { params: { param2: 'value2' }, pathParams: { param3: 'value3' } }];
    const result = getArgs(args);

    const expected = {
      method: 'post',
      apiName: 'apiName',
      url: 'http://example.com',
      data: { param1: 'value1' },
      params: { param2: 'value2' },
      pathParams: { param3: 'value3' },
      options: {}
    };

    expect(result).toEqual(expected);
  });

  it('should handle optional params correctly', () => {
    const args = ['GET', 'apiName', 'http://example.com'];
    const result = getArgs(args);

    const expected = {
      method: 'get',
      apiName: 'apiName',
      url: 'http://example.com',
      data: {},
      params: undefined,
      pathParams: undefined,
      options: {}
    };

    expect(result).toEqual(expected);
  });

  it('should handle lowercase method', () => {
    const args = ['put', 'apiName', 'http://example.com', { param1: 'value1' }, { params: { param2: 'value2' }, pathParams: { param3: 'value3' } }];
    const result = getArgs(args);

    const expected = {
      method: 'put',
      apiName: 'apiName',
      url: 'http://example.com',
      data: { param1: 'value1' },
      params: { param2: 'value2' },
      pathParams: { param3: 'value3' },
      options: {}
    };

    expect(result).toEqual(expected);
  });
});

describe('getRequestData', () => {
  it('should return the data as is when options.form is not provided', () => {
    const data = { key: 'value' };
    const options = {};

    const result = getRequestData(data, options);
    expect(result).toEqual(data);
  });

  it('should stringify the data when options.form is true', () => {
    const data = { key: 'value' };
    const options = { form: true };

    const result = getRequestData(data, options);
    expect(result).toBe('key=value');
  });

  it('should not modify the data when options.form is false', () => {
    const data = { key: 'value' };
    const options = { form: false };

    const result = getRequestData(data, options);
    expect(result).toEqual(data);
  });
});

describe('getRequestConfig', () => {
  it('should return a configuration object with default options', () => {
    const params = {};
    const options = {};

    const result = getRequestConfig(params, options);

    expect(result).toEqual({
      params: {
        _t: expect.any(Number),
      },
    });
  });

  it('should add a timestamp to params if appendTimestamp is true', () => {
    const params = {};
    const options = {};
    const appendTimestamp = true;

    const result = getRequestConfig(params, options, appendTimestamp);

    expect(result.params._t).toBeDefined();
  });

  it('should not add a timestamp to params if appendTimestamp is false', () => {
    const params = {};
    const options = {};
    const appendTimestamp = false;

    const result = getRequestConfig(params, options, appendTimestamp);

    expect(result.params._t).toBeUndefined();
  });

  it('should set Content-Type to "application/x-www-form-urlencoded" when options.form is true', () => {
    const params = {};
    const options = { form: true };

    const result = getRequestConfig(params, options);

    expect(result.headers['Content-Type']).toBe('application/x-www-form-urlencoded');
    expect(result.form).toBeUndefined();
  });

  it('should not set Content-Type to "application/x-www-form-urlencoded" when options.form is false', () => {
    const params = {};
    const options = { form: false };

    const result = getRequestConfig(params, options);

    expect(result?.headers?.['Content-Type']).toBeUndefined();
  });
});

describe("objectEqual", () => {
  it("should return true for equal objects", () => {
    const obj1 = { a: 1, b: { c: "x" } };
    const obj2 = { a: 1, b: { c: "x" } };

    const result = objectEqual(obj1, obj2);

    expect(result).toBe(true);
  });

  it("should return false for different objects", () => {
    const obj1 = { a: 1, b: { c: "x" } };
    const obj2 = { a: 2, b: { c: "y" } };

    const result = objectEqual(obj1, obj2);

    expect(result).toBe(false);
  });

  it("should handle empty objects", () => {
    const obj1 = {};
    const obj2 = {};

    const result = objectEqual(obj1, obj2);

    expect(result).toBe(true);
  });
});
