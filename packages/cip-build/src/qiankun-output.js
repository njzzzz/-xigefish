const customRootPath = require('app-root-path')
const reqlib = customRootPath.require
const { name } = reqlib('./package.json') // package.json的name需注意与主应用一致
// 测试发现需要剔除此配置会影响 externals 的配置 此处需要特别注意
/**
 * @deprecated
 * @param output
 */
exports.qiankunOutput = (output) => {
  console.warn('deprecated: 已放弃对乾坤子应用的支持')
  output.library = `${name}-[name]`
  output.libraryTarget = 'umd'
  output.jsonpFunction = `webpackJsonp_${name}`
}
