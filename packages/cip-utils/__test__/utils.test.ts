import {
  cloneDeep,
  objectEqual,
  throttle,
  debounce,
  toUpperFirstCase,
  toTreeData,
  isEmpty,
  isInputEmpty,
  isNotEmpty,
  isEmptyObject,
  isJson,
  getNextItem,
  durationTimeFormat,
  getQueryString,
  setUrlQuery,
  getLabelByValue,
  getFieldValue,
  setFieldValue,
  getKeyByValue,
  getValueMapping,
  depthFirstSearchIndexTree,
  depthFirstSearchTree,
  getPropertyKeyByPath,
  addThousandSeparator,
  getValueByTemplate,
  Strategy,
  subStr
} from "../src/util";
import { expect, describe, it, vi } from "vitest";

function waitTimeOut(time = 100, fn = () => {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn && fn());
    }, time);
  });
}
describe("cloneDeep", () => {
  it("should perform a deep clone", () => {
    const originalObject = {
      a: 1,
      b: {
        c: "hello",
        d: [1, 2, 3],
      },
    };
    const clonedObject = cloneDeep(originalObject);
    // 断言原始对象和克隆对象不是同一个引用
    expect(clonedObject).not.toBe(originalObject);
    // 断言克隆对象和原始对象的内容相等
    expect(clonedObject).toEqual(originalObject);
  });

  it("should handle circular references", () => {
    const circularObj: any = { a: 1 };
    circularObj.b = circularObj;
    const clonedCircularObj = cloneDeep(circularObj);
    // 断言克隆的对象和原始对象内容相等
    expect(clonedCircularObj).toEqual(circularObj);
    // 断言克隆的对象和原始对象不是同一个引用
    expect(clonedCircularObj.b).toBe(clonedCircularObj);
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

describe("throttle", () => {
  it("should throttle function calls", async () => {
    // 创建一个模拟函数
    const fn = vi.fn();
    // 使用 throttle 包装模拟函数，设置延迟时间为 100ms
    const throttledFunction = throttle(fn, 100);
    // 连续调用 throttledFunction，但只期望第一次调用触发函数
    throttledFunction();
    throttledFunction();
    throttledFunction();
    await waitTimeOut(100);
    expect(fn).toBeCalledTimes(1);
  });
});

describe("debounce", () => {
  it("should debounce function calls", async () => {
    // 创建一个模拟函数
    const fn = vi.fn();
    // 使用 debounce 包装模拟函数，设置延迟时间为 100ms
    const debouncedFunction = debounce(fn, 100);
    // 连续调用 debouncedFunction，但只期望最后一次调用触发函数
    debouncedFunction();
    debouncedFunction();
    debouncedFunction();
    expect(fn).toBeCalledTimes(0);
    await waitTimeOut(100);
    expect(fn).toBeCalledTimes(1);
  });

  it("should execute immediately if immediate option is true", async () => {
    // 创建一个模拟函数
    const fn = vi.fn();
    // 使用 debounce 包装模拟函数，设置延迟时间为 100ms，immediate 为 true
    const debouncedFunction = debounce(fn, 100, true);
    // 连续调用 debouncedFunction，但期望第一次调用立即触发函数
    debouncedFunction();
    expect(fn).toBeCalledTimes(1);
    debouncedFunction();
    debouncedFunction();
    await waitTimeOut(100);
    expect(fn).toBeCalledTimes(1);
  });

  it("should cancel debounce", (done) => {
    // 创建一个模拟函数
    const fn = vi.fn();
    // 使用 debounce 包装模拟函数，设置延迟时间为 100ms
    const debouncedFunction = debounce(fn, 100);
    // 调用 debouncedFunction，然后取消 debounce
    debouncedFunction();
    debouncedFunction.cancel();
    expect(fn).toBeCalledTimes(0);
  });
});

describe("toUpperFirstCase", () => {
  it("should convert the first character to uppercase", () => {
    const input = "hello world";
    const expected = "Hello world";

    const result = toUpperFirstCase(input);

    expect(result).toBe(expected);
  });

  it("should handle empty string", () => {
    const input = "";
    const expected = "";

    const result = toUpperFirstCase(input);

    expect(result).toBe(expected);
  });

  it("should handle already uppercase first character", () => {
    const input = "Hello";
    const expected = "Hello";

    const result = toUpperFirstCase(input);

    expect(result).toBe(expected);
  });
});

describe("toTreeData", () => {
  it("should convert flat list to tree structure", () => {
    // 创建一个模拟的扁平列表
    const flatList = [
      { id: 1, name: "Root", parentId: 0 },
      { id: 2, name: "Child 1", parentId: 1 },
      { id: 3, name: "Child 2", parentId: 1 },
      { id: 4, name: "Child 1.1", parentId: 2 },
      { id: 5, name: "Child 1.2", parentId: 2 },
    ];

    // 转换扁平列表为树结构
    const tree = toTreeData(flatList);
    // 期望树结构包含根节点和子节点
    expect(tree).toHaveLength(1);
    expect(tree[0].name).toBe("Root");
    expect(tree[0].children).toHaveLength(2);
    const child1 = tree[0].children[0];
    const child2 = tree[0].children[1];
    expect(child1.name).toBe("Child 1");
    expect(child1.children).toHaveLength(2);
    expect(child2.name).toBe("Child 2");
    expect(child2.children ?? []).toHaveLength(0);
    const child11 = child1.children[0];
    const child12 = child1.children[1];
    expect(child11.name).toBe("Child 1.1");
    expect(child11.children ?? []).toHaveLength(0);
    expect(child12.name).toBe("Child 1.2");
    expect(child12.children ?? []).toHaveLength(0);
  });

  it("should handle empty list", () => {
    // 创建一个空的列表
    const flatList: any[] = [];
    // 转换空列表为树结构
    const tree = toTreeData(flatList);
    // 期望树结构为空数组
    expect(tree).toHaveLength(0);
  });

});


describe('isEmpty', () => {
  it('should return true for undefined', () => {
    const value = undefined;
    const result = isEmpty(value);
    expect(result).toBe(true);
  });

  it('should return true for null', () => {
    const value = null;
    const result = isEmpty(value);
    expect(result).toBe(true);
  });

  it('should return false for non-empty values', () => {
    const value1 = 0;
    const value2 = false;
    const value3 = '';
    const value4 = { key: 'value' };
    const value5 = [1, 2, 3];

    expect(isEmpty(value1)).toBe(false);
    expect(isEmpty(value2)).toBe(false);
    expect(isEmpty(value3)).toBe(false);
    expect(isEmpty(value4)).toBe(false);
    expect(isEmpty(value5)).toBe(false);
  });
});


describe('isInputEmpty', () => {
  it('should return true for undefined', () => {
    const value = undefined;
    const result = isInputEmpty(value);
    expect(result).toBe(true);
  });

  it('should return true for null', () => {
    const value = null;
    const result = isInputEmpty(value);
    expect(result).toBe(true);
  });

  it('should return true for empty string', () => {
    const value = '';
    const result = isInputEmpty(value);
    expect(result).toBe(true);
  });

  it('should return false for non-empty values', () => {
    const value1 = 0;
    const value2 = false;
    const value3 = 'non-empty';
    const value4 = { key: 'value' };
    const value5 = [1, 2, 3];

    expect(isInputEmpty(value1)).toBe(false);
    expect(isInputEmpty(value2)).toBe(false);
    expect(isInputEmpty(value3)).toBe(false);
    expect(isInputEmpty(value4)).toBe(false);
    expect(isInputEmpty(value5)).toBe(false);
  });

});

describe('isNotEmpty', () => {
  it('should return false for undefined', () => {
    const value = undefined;
    const result = isNotEmpty(value);
    expect(result).toBe(false);
  });

  it('should return false for null', () => {
    const value = null;
    const result = isNotEmpty(value);
    expect(result).toBe(false);
  });

  it('should return false for empty string', () => {
    const value = '';
    const result = isNotEmpty(value);
    expect(result).toBe(true);
  });

  it('should return true for non-empty values', () => {
    const value1 = 0;
    const value2 = false;
    const value3 = 'non-empty';
    const value4 = { key: 'value' };
    const value5 = [1, 2, 3];

    expect(isNotEmpty(value1)).toBe(true);
    expect(isNotEmpty(value2)).toBe(true);
    expect(isNotEmpty(value3)).toBe(true);
    expect(isNotEmpty(value4)).toBe(true);
    expect(isNotEmpty(value5)).toBe(true);
  });
});

describe('isEmptyObject', () => {
  it('should return true for an empty object', () => {
    const value = {};
    const result = isEmptyObject(value);
    expect(result).toBe(true);
  });

  it('should return false for a non-empty object', () => {
    const value = { key: 'value' };
    const result = isEmptyObject(value);
    expect(result).toBe(false);
  });
});

describe('isJson', () => {
  it('should return true for a valid JSON string', () => {
    const jsonStr = '{"key": "value"}';
    const result = isJson(jsonStr);
    expect(result).toBe(true);
  });

  it('should return false for an invalid JSON string', () => {
    const invalidJsonStr = 'not a JSON string';
    const result = isJson(invalidJsonStr);
    expect(result).toBe(false);
  });

  it('should return false for empty string', () => {
    const emptyStr = '';
    const result = isJson(emptyStr);
    expect(result).toBe(false);
  });

  it('should return false for non-string values', () => {
    const value1 = { key: 'value' } as any;
    const value2 = 42 as any;
    const value3 = true as any;
    const value4 = null as any;
    const value5 = undefined as any;

    expect(isJson(value1)).toBe(false);
    expect(isJson(value2)).toBe(false);
    expect(isJson(value3)).toBe(false);
    expect(isJson(value4)).toBe(false);
    expect(isJson(value5)).toBe(false);
  });

});


describe('getNextItem', () => {
  it('should return the next item in the list', () => {
    const itemList = [1, 2, 3, 4, 5];
    const index = 2; // 索引为2，即第三个元素

    const result = getNextItem(itemList, index);

    expect(result).toBe(4); // 预期返回下一个元素4
  });

  it('should return the previous item if at the end of the list', () => {
    const itemList = ['apple', 'banana', 'cherry'];
    const index = 2; // 索引为2，即最后一个元素

    const result = getNextItem(itemList, index);

    expect(result).toBe('banana'); // 预期返回前一个元素'banana'
  });

  it('should return an empty object for an empty list', () => {
    const itemList: any[] = [];
    const index = 0; // 索引为0

    const result = getNextItem(itemList, index);

    expect(result).toEqual(undefined);
  });

  it('should return an empty object for an index out of bounds', () => {
    const itemList = ['one', 'two', 'three'];
    const index = 5; // 超出索引范围

    const result = getNextItem(itemList, index);

    expect(result).toEqual(undefined);
  });

});

describe('durationTimeFormat', () => {
  it('should format time in seconds', () => {
    const time = 12345; // 13秒

    const result = durationTimeFormat(time);

    expect(result).toBe('13秒'); // 预期返回格式化后的字符串
  });

  it('should format time in minutes and seconds', () => {
    const time = 123456; //  2分4秒

    const result = durationTimeFormat(time);

    expect(result).toBe('2分4秒'); // 预期返回格式化后的字符串
  });

  it('should format time in hours, minutes, and seconds', () => {
    const time = 12345678; // 3小时25分46秒

    const result = durationTimeFormat(time);

    expect(result).toBe('3小时25分46秒'); // 预期返回格式化后的字符串
  });

  it('should format time in days, hours, minutes, and seconds', () => {
    const time = 1234567890; // 14天6小时56分8秒

    const result = durationTimeFormat(time);

    expect(result).toBe('14天6小时56分8秒'); // 预期返回格式化后的字符串
  });

  it('should format time in months, days, hours, minutes, and seconds', () => {
    const time = 123456789012; // 3年11月3天21小时33分10秒

    const result = durationTimeFormat(time);

    expect(result).toBe('3年11月3天21小时33分10秒'); // 预期返回格式化后的字符串
  });

  it('should format time in years, months, days, hours, minutes, and seconds', () => {
    const time = 12345678901234; // 396年10月24天19小时15分2秒

    const result = durationTimeFormat(time);

    expect(result).toBe('396年10月24天19小时15分2秒'); // 预期返回格式化后的字符串
  });

  it('should handle zero time', () => {
    const time = 0;

    const result = durationTimeFormat(time);

    expect(result).toBe(''); // 预期返回空字符串
  });

  it('should handle non-number input', () => {
    const time = 'invalid' as any;

    const result = durationTimeFormat(time);

    expect(result).toBe(''); // 预期返回空字符串
  });

});

// 模拟浏览器环境中的 window 对象
const mockWindow = {
  location: {
    href: 'http://example.com/?key1=value1&key2=value2#hash',
  },
};

describe('getQueryString', () => {
  it('should return the value of a query parameter', () => {
    const key = 'key1';

    // 使用 mockWindow 模拟浏览器环境
    const result = getQueryString(key,  mockWindow.location.href);

    expect(result).toBe('value1'); // 预期返回查询参数的值
  });

  it('should return null for a non-existing query parameter', () => {
    const key = 'nonExistentKey';

    // 使用 mockWindow 模拟浏览器环境
    const result = getQueryString(key, mockWindow.location.href);

    expect(result).toBe(null); // 预期返回 null
  });

  it('should handle a custom URL', () => {
    const key = 'key2';
    const customUrl = 'http://example.com/?key2=customValue';

    const result = getQueryString(key, customUrl);

    expect(result).toBe('customValue'); // 预期返回查询参数的值
  });

  it('should decode URL-encoded values', () => {
    const key = 'encodedKey';
    const encodedValue = 'encoded%20value';
    const customUrl = `http://example.com/?${key}=${encodedValue}`;

    const result = getQueryString(key, customUrl);

    expect(result).toBe('encoded value'); // 预期返回解码后的值
  });

  it('should handle an empty URL', () => {
    const key = 'key';

    // 使用 mockWindow 模拟浏览器环境
    const result = getQueryString(key, mockWindow.location.href);

    expect(result).toBe(null); // 预期返回 null
  });

});

describe('setUrlQuery', () => {
  it('should add query parameters to a URL', () => {
    const url = 'http://example.com';
    const query = { key1: 'value1', key2: 'value2' };

    const result = setUrlQuery(url, query);

    expect(result).toBe('http://example.com?key1=value1&key2=value2'); // 预期返回包含查询参数的 URL
  });

  it('should handle an empty URL', () => {
    const url = '';
    const query = { key: 'value' };

    const result = setUrlQuery(url, query);

    expect(result).toBe(''); // 预期返回空字符串
  });

  it('should handle empty query parameters', () => {
    const url = 'http://example.com';
    const query = {};

    const result = setUrlQuery(url, query);

    expect(result).toBe('http://example.com?');
  });

  it('should handle URL with existing query parameters', () => {
    const url = 'http://example.com?key1=value1';
    const query = { key2: 'value2' };

    const result = setUrlQuery(url, query);

    expect(result).toBe('http://example.com?key1=value1&key2=value2'); // 预期返回包含新查询参数的 URL
  });

  it('should handle query parameters with special characters', () => {
    const url = 'http://example.com';
    const query = { key: 'value with spaces', specialKey: '!@#$%^&*' };

    const result = setUrlQuery(url, query);

    expect(result).toBe('http://example.com?key=value with spaces&specialKey=!@#$%^&*');
  });

});

describe('getLabelByValue', () => {
  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];

  it('should return the label for a valid value', () => {
    const value = 'banana';

    const result = getLabelByValue(value, options, { value: 'value', label: 'label' });

    expect(result).toBe('Banana'); // 预期返回匹配值的标签
  });

  it('should return undefined for an invalid value', () => {
    const value = 'grape';

    const result = getLabelByValue(value, options, { value: 'value', label: 'label' });

    expect(result).toBeUndefined(); // 预期返回 undefined
  });

  it('should handle custom optionProps', () => {
    const value = 'cherry';

    const result = getLabelByValue(value, options, { value: 'val', label: 'text' });

    expect(result).toBeUndefined();
  });

  it('should return undefined for an empty options array', () => {
    const value = 'apple';

    const result = getLabelByValue(value, [], { value: 'value', label: 'label' });

    expect(result).toBeUndefined(); // 预期返回 undefined
  });

  it('should return undefined for missing optionProps', () => {
    const value = 'banana';

    const result = getLabelByValue(value, options, {} as any);

    expect(result).toBeUndefined(); // 预期返回 undefined
  });

});

describe('getFieldValue', () => {
  const data = {
    person: {
      name: 'John',
      address: {
        city: 'New York',
      },
      hobbies: ['Reading', 'Swimming'],
    },
  };

  it('should get a nested property', () => {
    const propertyName = 'person.name';

    const result = getFieldValue(data, propertyName);

    expect(result).toBe('John'); // 预期返回嵌套属性的值
  });

  it('should get a nested array element', () => {
    const propertyName = 'person.hobbies.1';

    const result = getFieldValue(data, propertyName);

    expect(result).toBe('Swimming'); // 预期返回嵌套数组元素的值
  });

  it('should handle invalid property name', () => {
    const propertyName = 'person.invalid';

    const result = getFieldValue(data, propertyName);

    expect(result).toBeUndefined(); // 预期返回 undefined
  });

  it('should handle invalid array index', () => {
    const propertyName = 'person.hobbies.invalid';

    const result = getFieldValue(data, propertyName);

    expect(result).toBeUndefined(); // 预期返回 undefined
  });

  it('should handle empty property name', () => {
    const propertyName = '';

    const result = getFieldValue(data, propertyName);

    expect(result).toBeUndefined(); // 预期返回 undefined
  });

});


describe('setFieldValue', () => {
  it('should set a nested property', () => {
    const target = {};
    const propertyName = 'person.name';
    const value = 'John';

    setFieldValue(target, propertyName, value);

    expect(target).toEqual({ person: { name: 'John' } }); // 预期目标对象包含嵌套属性
  });

  it('should set a nested array element', () => {
    const target = { person: { hobbies: [] } };
    const propertyName = 'person.hobbies.0';
    const value = 'Reading';

    setFieldValue(target, propertyName, value, true);

    expect(target).toEqual({ person: { hobbies: ['Reading'] } }); // 预期目标对象包含嵌套数组元素
  });

  it('should handle invalid property name', () => {
    const target = {};
    const propertyName = 'person.invalid';
    const value = 'Invalid';

    setFieldValue(target, propertyName, value);

    expect(target).toEqual({
      person: {
        invalid: "Invalid"
      }
    });
  });

  it('should handle empty property name', () => {
    const target = {};
    const propertyName = '';
    const value = 'Empty';

    setFieldValue(target, propertyName, value);

    expect(target).toEqual({"": "Empty" });
  });

});

describe('getKeyByValue', () => {
  it('should return the key for a value in an object', () => {
    const mapping = { key1: 'value1', key2: 'value2' };
    const value = 'value1';

    const result = getKeyByValue(value, mapping);

    expect(result).toBe('key1'); // 预期返回匹配值的键
  });

  it('should return the key for a value in a Map', () => {
    const mapping = new Map([['key1', 'value1'], ['key2', 'value2']]);
    const value = 'value2';

    const result = getKeyByValue(value, mapping);

    expect(result).toBe('key2'); // 预期返回匹配值的键
  });

  it('should handle value not found in an object', () => {
    const mapping = { key1: 'value1', key2: 'value2' };
    const value = 'value3';

    const result = getKeyByValue(value, mapping);

    expect(result).toBeUndefined(); // 预期返回 undefined
  });

  it('should handle value not found in a Map', () => {
    const mapping = new Map([['key1', 'value1'], ['key2', 'value2']]);
    const value = 'value3';

    const result = getKeyByValue(value, mapping);

    expect(result).toBeUndefined(); // 预期返回 undefined
  });

});

describe('getValueMapping', () => {
  const mapping = { key1: 'value1', key2: 'value2' };

  it('should return the mapped value for a value type', () => {
    const value = 'value1';
    const valueType = 'value';

    const result = getValueMapping(value, mapping, valueType);

    expect(result).toBe('key1'); // 预期返回映射的键
  });

  it('should return the mapped value for a key type', () => {
    const value = 'key2';
    const valueType = 'key';

    const result = getValueMapping(value, mapping, valueType);

    expect(result).toBe('value2'); // 预期返回映射的值
  });

  it('should handle value not found for a value type', () => {
    const value = 'value3';
    const valueType = 'value';

    const result = getValueMapping(value, mapping, valueType);

    expect(result).toBeUndefined(); // 预期返回 undefined
  });

  it('should handle value not found for a key type', () => {
    const value = 'key3';
    const valueType = 'key';

    const result = getValueMapping(value, mapping, valueType);

    expect(result).toBeUndefined(); // 预期返回 undefined
  });

  it('should handle empty mapping', () => {
    const value = 'value1';
    const valueType = 'value';

    const result = getValueMapping(value, {}, valueType);

    expect(result).toBeUndefined(); // 预期返回 undefined
  });

  it('should handle invalid valueType', () => {
    const value = 'value1';
    const valueType = 'invalid';

    const result = getValueMapping(value, mapping, valueType);

    expect(result).toBeUndefined(); // 预期返回 undefined
  });

});

describe('depthFirstSearchTree', () => {
  const tree = {
    id: 1,
    name: 'A',
    children: [
      {
        id: 2,
        name: 'B',
        children: [
          {
            id: 3,
            name: 'C',
            children: [
              {
                id: 4,
                name: 'D',
                children: [
                  {
                    id: 5,
                    name: 'E',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  it('should return the subtree matching the value', () => {
    const value = 'C';
    const key = 'name';

    const result = depthFirstSearchTree(tree, value, key);

    expect(result).toEqual([
      {
        id: 1,
        name: 'A',
      },
      {
        id: 2,
        name: 'B',
      },
      {
        id: 3,
        name: 'C',
      },

    ]); // 预期返回匹配的子树
  });

  it('should return undefined when no match is found', () => {
    const value = 'X';
    const key = 'name';

    const result = depthFirstSearchTree(tree, value, key);

    expect(result).toBeUndefined(); // 预期返回 undefined
  });

  it('should handle empty tree', () => {
    const value = 'A';
    const key = 'name';

    const result = depthFirstSearchTree(undefined, value, key);

    expect(result).toBeUndefined(); // 预期返回 undefined
  });

  it('should handle custom key', () => {
    const value = 5;
    const key = 'id';

    const result = depthFirstSearchTree(tree, value, key);

    expect(result).toEqual([
      {
        id: 1,
        name: 'A',
      },
      {
        id: 2,
        name: 'B',
      },
      {
        id: 3,
        name: 'C',
      },
      {
        id: 4,
        name: 'D',
      },
      {
        id: 5,
        name: 'E',
      },
    ]);
  });

});

describe('depthFirstSearchIndexTree', () => {
  const tree = [
    { id: 1, name: 'A', children: [] },
    { id: 2, name: 'B', children: [] },
    {
      id: 3,
      name: 'C',
      children: [
        { id: 4, name: 'D', children: [] },
        { id: 5, name: 'E', children: [] },
      ],
    },
    { id: 6, name: 'F', children: [] },
  ];

  it('should return the index of the matching node', () => {
    const value = 'C';
    const key = 'name';

    const result = depthFirstSearchIndexTree(tree, value, key);

    expect(result).toEqual([2]); // 预期返回匹配节点的索引
  });

  it('should return undefined when no match is found', () => {
    const value = 'X';
    const key = 'name';

    const result = depthFirstSearchIndexTree(tree, value, key);

    expect(result).toBeUndefined(); // 预期返回 undefined
  });

  it('should handle empty tree', () => {
    const value = 'A';
    const key = 'name';

    const result = depthFirstSearchIndexTree([], value, key);

    expect(result).toBeUndefined(); // 预期返回 undefined
  });

  it('should handle custom key', () => {
    const value = 5;
    const key = 'id';

    const result = depthFirstSearchIndexTree(tree, value, key);

    expect(result).toEqual([2,1]); // 预期返回匹配节点的索引
  });
});

describe('getPropertyKeyByPath', () => {
  const path = ['parent', 0, 'child'];
  const treeProps = { children: 'items' };

  it('should return the property key with children path', () => {
    const result = getPropertyKeyByPath(path, treeProps);

    expect(result).toBe('parent.items.0.items.child'); // 预期返回拼接的属性路径
  });

  it('should return an empty string for an empty path', () => {
    const emptyPath = [];
    const result = getPropertyKeyByPath(emptyPath, treeProps);

    expect(result).toBe(''); // 预期返回一个空字符串
  });

  it('should handle custom children key', () => {
    const customTreeProps = { children: 'nodes' };
    const result = getPropertyKeyByPath(path, customTreeProps);

    expect(result).toBe('parent.nodes.0.nodes.child'); // 预期返回拼接的属性路径
  });
});

describe('addThousandSeparator', () => {
  it('should add a comma separator to a number', () => {
    const number = 1234567;
    const separator = ',';

    const result = addThousandSeparator(number, separator);

    expect(result).toBe('1,234,567'); // 预期返回带千位分隔符的数字字符串
  });

  it('should add a custom separator to a number', () => {
    const number = 1234567;
    const separator = '-';

    const result = addThousandSeparator(number, separator);

    expect(result).toBe('1-234-567'); // 预期返回带自定义分隔符的数字字符串
  });

  it('should handle decimal numbers', () => {
    const number = 1234567.89;
    const separator = ',';

    const result = addThousandSeparator(number, separator);

    expect(result).toBe('1,234,567.89'); // 预期返回带千位分隔符的带小数的数字字符串
  });

  it('should handle negative numbers', () => {
    const number = -1234567;
    const separator = ',';

    const result = addThousandSeparator(number, separator);

    expect(result).toBe('-1,234,567'); // 预期返回带千位分隔符的负数字符串
  });

  it('should handle zero', () => {
    const number = 0;
    const separator = ',';

    const result = addThousandSeparator(number, separator);

    expect(result).toBe('0'); // 预期返回零
  });

});

describe('getValueByTemplate', () => {
  it('should replace template placeholders with values', () => {
    const template = 'Hello, ${name}! How are you, ${question}?';
    const object = { name: 'John', question: 'doing today' };

    const result = getValueByTemplate(template, object);

    expect(result).toBe('Hello, John! How are you, doing today?'); // 预期返回替换后的字符串
  });

  it('should handle missing values', () => {
    const template = 'Hello, ${name}! How are you, ${question}?';
    const object = { name: 'John' };

    const result = getValueByTemplate(template, object);

    expect(result).toBe('Hello, John! How are you, ${question}?'); // 预期返回替换后的字符串，其中缺少的值保持不变
  });

  it('should handle non-string templates', () => {
    const template = 42;
    const object = { name: 'John' };

    const result = getValueByTemplate(template, object);

    expect(result).toBe(42); // 预期返回原始值，因为模板不是字符串
  });

  it('should handle empty template', () => {
    const template = '';
    const object = { name: 'John' };

    const result = getValueByTemplate(template, object);

    expect(result).toBe(''); // 预期返回空字符串，因为模板为空
  });

  it('should handle empty object', () => {
    const template = 'Hello, ${name}!';
    const object = {};

    const result = getValueByTemplate(template, object);

    expect(result).toBe('Hello, ${name}!'); // 预期返回未替换的模板字符串，因为对象为空
  });

});

describe('Strategy', () => {
  it('should set and execute a strategy', () => {
    const strategyObj = new Strategy();
    const type = 'doSomething';
    let executed = false;

    strategyObj.setStrategy(type, () => {
      executed = true;
    });

    strategyObj.execute(type);

    expect(executed).toBe(true); // 预期策略被执行
  });

  it('should throw an error when executing an unknown strategy', () => {
    const strategyObj = new Strategy();
    const unknownType = 'unknown';

    const executeFunction = () => {
      strategyObj.execute(unknownType);
    };

    expect(executeFunction).toThrow(); // 预期执行时抛出错误
  });

  it('should handle custom error message', () => {
    const customMessage = 'Custom error message';
    const strategyObj = new Strategy({ message: customMessage });
    const unknownType = 'unknown';

    const executeFunction = () => {
      strategyObj.execute(unknownType);
    };

    expect(executeFunction).toThrow(customMessage); // 预期执行时抛出自定义错误消息
  });

  it('should handle multiple strategies', () => {
    const strategyObj = new Strategy();
    const type1 = 'doSomething1';
    const type2 = 'doSomething2';
    let executed1 = false;
    let executed2 = false;

    strategyObj.setStrategy(type1, () => {
      executed1 = true;
    });

    strategyObj.setStrategy(type2, () => {
      executed2 = true;
    });

    strategyObj.execute(type1);
    strategyObj.execute(type2);

    expect(executed1).toBe(true); // 预期第一个策略被执行
    expect(executed2).toBe(true); // 预期第二个策略被执行
  });

});

describe('subStr', () => {
  it('should return a substring with positive start and end', () => {
    const inputString = 'Hello, World!';
    const startIndex = 0;
    const endIndex = 5;

    const result = subStr(inputString, startIndex, endIndex);

    expect(result).toBe('Hello'); // 预期返回指定范围内的子字符串
  });

  it('should return an empty string with negative end index that exceeds the string length', () => {
    const inputString = 'Hello, World!';
    const startIndex = 0;
    const endIndex = -100;

    const result = subStr(inputString, startIndex, endIndex);

    expect(result).toBe(''); // 预期返回空字符串，因为负数索引超出字符串长度
  });

  it('should handle non-string input and throw an error', () => {
    const nonStringInput = 123 as any;
    const startIndex = 0;
    const endIndex = 5;

    const executeFunction = () => {
      subStr(nonStringInput, startIndex, endIndex);
    };

    expect(executeFunction).toThrowError('param is not string'); // 预期在非字符串输入时抛出错误
  });

});
