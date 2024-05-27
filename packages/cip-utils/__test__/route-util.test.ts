import { expect,describe,it } from 'vitest';
import {
  getRouteName,
  prependRoutes,
  getBaseName,
  getDefaultBaseRoute,
} from '../src/route-util';
import { toUpperFirstCase } from "../src/util";

describe('getRouteName', () => {
  it('should return the route name with base name', () => {
    const baseName = 'Base';
    const routeName = 'Home';

    const result = getRouteName(baseName, routeName);

    expect(result).toBe('BaseHome'); // 预期返回带有基本名称的路由名称
  });

  it('should return the route name without base name', () => {
    const baseName = '';
    const routeName = 'Home';

    const result = getRouteName(baseName, routeName);

    expect(result).toBe('Home'); // 预期返回路由名称，没有基本名称
  });
});

describe('prependRoutes', () => {
  it('should prepend path to routes', () => {
    const routes = [{ path: '/page1' }, { path: '/page2' }];
    const path = '/parent';

    const result = prependRoutes(routes, { path });

    expect(result[0].path).toBe('/parent/page1'); // 预期路径已添加到第一个路由
    expect(result[1].path).toBe('/parent/page2'); // 预期路径已添加到第二个路由
  });

  it('should prepend name to routes', () => {
    const routes = [{ name: 'Page1' }, { name: 'Page2' }];
    const name = 'Parent';

    const result = prependRoutes(routes, { name });

    expect(result[0].name).toBe('ParentPage1'); // 预期名称已添加到第一个路由
    expect(result[1].name).toBe('ParentPage2'); // 预期名称已添加到第二个路由
  });
});

describe('getBaseName', () => {
  it('should return base name with upper case', () => {
    const basePath = '/parent/child/page';

    const result = getBaseName(basePath);

    expect(result).toBe('parentChildPage');
  });

  it('should return base name without upper case', () => {
    const basePath = '/parent';

    const result = getBaseName(basePath);

    expect(result).toBe('parent'); // 预期基本名称不包含大写形式
  });
});

describe('getDefaultBaseRoute', () => {
  it('should return default base route with framework path', () => {
    const filePath = '/pages/Home/index.js';
    const frameworkPath = '/app';

    const result = getDefaultBaseRoute(filePath, frameworkPath);

    expect(result).toBe('/app/Home/indexjs'); // 预期默认基本路由与框架路径组合
  });

  it('should return default base route without framework path', () => {
    const filePath = '/pages/Home/index.js';
    const frameworkPath = '';

    const result = getDefaultBaseRoute(filePath, frameworkPath);

    expect(result).toBe('/Home/indexjs'); // 预期默认基本路由不包含框架路径
  });
});

describe('toUpperFirstCase', () => {
  it('should convert first character to upper case', () => {
    const str = 'word';

    const result = toUpperFirstCase(str);

    expect(result).toBe('Word'); // 预期第一个字符已转换为大写
  });

  it('should handle empty string', () => {
    const str = '';

    const result = toUpperFirstCase(str);

    expect(result).toBe(''); // 预期返回空字符串
  });
});
