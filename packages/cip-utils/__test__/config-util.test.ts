import { describe, expect, it } from "vitest";
import {
  configMapToList,
  insertFieldConfigToList,
  configListToMap,
  keysToConfigMap
} from "../src/config-util";

describe("describe configMapToList", () => {
  it("should convert config map to list", () => {
    const configMap = {
      field1: {
        a: 1,
        b: 2,
      },
      field2: {
        a: 1,
        b: 2,
      },
    };

    const expectedResult = [
      {
        key: "field1",
        config: { a: 1, b: 2 },
        sort: 0, // 默认排序
      },
      {
        key: "field2",
        config: { a: 1, b: 2 },
        sort: 1, // 默认排序
      },
    ];

    const result = configMapToList(configMap);
    expect(result).toStrictEqual(expectedResult);
  });
});

describe("describe insertFieldConfigToList", () => {
  it("insertFieldConfigToList should insert field config correctly", () => {
    // 创建目标数组和源数组
    const target = [{ key: "field1" }, { key: "field2" }] as any;

    const source = [
      { key: "newField", config: { insert: { before: "field2" } } },
    ];

    // 调用 insertFieldConfigToList 函数
    const result = insertFieldConfigToList(target, source);

    // 验证是否正确插入了新的字段配置
    expect(result).toEqual([
      { key: "field1" },
      { key: "newField", config: { insert: { before: "field2" } } },
      { key: "field2" },
    ]);
  });

  it("insertFieldConfigToList should append field config if no insert specified", () => {
    // 创建目标数组和源数组
    const target = [{ key: "field1" }] as any;

    const source = [{ key: "newField" }] as any;

    // 调用 insertFieldConfigToList 函数
    const result = insertFieldConfigToList(target, source);

    // 验证是否正确追加了新的字段配置
    expect(result).toEqual([{ key: "field1" }, { key: "newField" }]);
  });

  it("insertFieldConfigToList should handle insert.after correctly", () => {
    // 创建目标数组和源数组
    const target = [{ key: "field1" }, { key: "field2" }] as any;

    const source = [
      { key: "newField", config: { insert: { after: "field1" } } },
    ];

    // 调用 insertFieldConfigToList 函数
    const result = insertFieldConfigToList(target, source);

    // 验证是否正确插入了新的字段配置
    expect(result).toEqual([
      { key: "field1" },
      { key: "newField", config: { insert: { after: "field1" } } },
      { key: "field2" },
    ]);
  });

  it("insertFieldConfigToList should handle multiple inserts correctly", () => {
    // 创建目标数组和源数组
    const target = [{ key: "field1" }, { key: "field2" }] as any;

    const source = [
      { key: "newField1", config: { insert: { before: "field1" } } },
      { key: "newField2", config: { insert: { after: "field2" } } },
    ];

    // 调用 insertFieldConfigToList 函数
    const result = insertFieldConfigToList(target, source);

    // 验证是否正确插入了新的字段配置
    expect(result).toEqual([
      { key: "newField1", config: { insert: { before: "field1" } } },
      { key: "field1" },
      { key: "field2" },
      { key: "newField2", config: { insert: { after: "field2" } } },
    ]);
  });

  it("insertFieldConfigToList should handle empty source correctly", () => {
    // 创建目标数组
    const target = [{ key: "field1" }] as any;

    const source = [];

    // 调用 insertFieldConfigToList 函数
    const result = insertFieldConfigToList(target, source);

    // 验证是否保持不变
    expect(result).toEqual([{ key: "field1" }]);
  });
});

describe("configListToMap", () => {
  it("should convert config list to map correctly", () => {
    const configList = [
      { key: "field1", config: { type: "text" } },
      { key: "field2", config: { type: "number" } },
      { key: "field3", config: { type: "1" } },
    ];

    // 调用 configListToMap 函数
    const result = configListToMap(configList);

    // 验证是否正确转换为配置映射
    expect(result).toEqual({
      field1: { type: "text" },
      field2: { type: "number" },
      field3: {
        type: "1",
      },
    });
  });

  it("should handle empty config list correctly", () => {
    // 创建空的配置列表
    const configList = [];

    // 调用 configListToMap 函数
    const result = configListToMap(configList);

    // 验证是否返回空对象
    expect(result).toEqual({});
  });
});

describe('keysToConfigMap', () => {
  it('should convert keys to config map with empty objects', () => {
    // 定义输入的 keys 数组
    const keys = ['key1', 'key2', 'key3'];

    // 调用 keysToConfigMap 函数
    const configMap = keysToConfigMap(keys);

    // 预期结果是将每个 key 转换为对应的空对象
    expect(configMap).toEqual({
      key1: {},
      key2: {},
      key3: {},
    });
  });

  it('should convert keys with existing properties to config map', () => {
    // 定义包含属性的 key 对象数组
    const keys = [
      { key: 'key1', prop1: 'value1' },
      { key: 'key2', prop2: 'value2' },
    ];

    // 调用 keysToConfigMap 函数
    const configMap = keysToConfigMap(keys);

    // 预期结果是将每个 key 对象转换为对应的对象，并保留原始属性
    expect(configMap).toEqual({
      key1: { prop1: 'value1' },
      key2: { prop2: 'value2' },
    });
  });

  it('should remove "key" property from converted objects', () => {
    // 定义包含属性的 key 对象数组，且带有 "key" 属性
    const keys = [
      { key: 'key1', prop1: 'value1' },
      { key: 'key2', prop2: 'value2' },
    ];

    // 调用 keysToConfigMap 函数
    const configMap = keysToConfigMap(keys);

    // 预期结果是将 "key" 属性从转换后的对象中移除
    expect(configMap).toEqual({
      key1: { prop1: 'value1' },
      key2: { prop2: 'value2' },
    });
  });
});
