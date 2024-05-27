const customRootPath = require('app-root-path')
const reqlib = customRootPath.require
const aliasConfig = reqlib('./config/alias-config')
const resolve = dir => {
  return customRootPath.resolve(dir)
}
exports.vueAlias = (alias) => {
  Object.keys(aliasConfig).forEach(key => {
    alias.set(key, resolve(aliasConfig[key]))
  })
}
const getWebpackAlias = () => {
  const result = {}
  Object.keys(aliasConfig).forEach(key => {
    result[key] = resolve(aliasConfig[key])
  })
  return result
}
exports.webpackAlias = getWebpackAlias()

exports.jestAlias = () => {
  const result = {}
  Object.keys(aliasConfig).forEach(key => {
    result[`^${key}/(.*)$`] = `<rootDir>${aliasConfig[key]}/$1`
  })
  return result
}