/**
 * 不让vue编译将micro-app开头的tag
 * 在vue-cli chainWebpack中执行
 * @param config chainWebpack提供的config
 */
// BROKEN_CHANGE: 此文件需要迁移到@xigefish/build中
module.exports = function setCustomElement (config, regex) {
  if(!(regex instanceof RegExp)) throw 'regex必须为RegExp'
  config.module
    .rule('vue')
    .use('vue-loader')
    .tap(options => {
      options.compilerOptions = {
        ...(options.compilerOptions || {}),
        isCustomElement: (tag) => regex.test(tag)
      }
      return options
    })
}
