import { expect, describe, it } from 'vitest';
import Model from '../../src/model/model'; // 替换为您的模块路径

describe('Model', () => {
  it('should convert data from API to local format', () => {
    const modelConfig = {
      name: { type: String },
      age: { type: Number },
    };
    const dataFromAPI = { name: 'Alice', age: '30' }; // Note that age is a string here.

    const model = new Model(modelConfig);
    const localData = model.fromData(dataFromAPI);

    expect(localData).toEqual({ name: 'Alice', age: 30 });
  });

  it('should support custom data mapping', () => {
    const modelConfig = {
      gender: { type: String, map: new Map().set('M', 'Male').set('F', 'Female') },
    };
    const dataFromAPI = { gender: 'M' };

    const model = new Model(modelConfig);
    const localData = model.fromData(dataFromAPI);

    expect(localData).toEqual({ gender: 'Male' });
  });

  it('should convert local data to API format', () => {
    const modelConfig = {
      name: { type: String },
      age: { type: Number },
    };
    const localData = { name: 'Alice', age: 30 };

    const model = new Model(modelConfig);
    const apiData = model.toData(localData);

    expect(apiData).toEqual({ name: 'Alice', age: 30 });
  });

  it('should support custom data mapping for API format', () => {
    const modelConfig = {
      gender: { type: String, map: new Map().set('M', 'Male').set('F', 'Female') },
    };
    const localData = { gender: 'Male' };

    const model = new Model(modelConfig);
    const apiData = model.toData(localData);

    expect(apiData).toEqual({ gender: 'M' });
  });

});
