/**
 * 不让vue编译将micro-app开头的tag
 * 在vue-cli chainWebpack中执行
 * @param config chainWebpack提供的config
 */
module.exports = function setCustomElement (config) {
  config.module
    .rule('vue')
    .use('vue-loader')
    .tap(options => {
      options.compilerOptions = {
        ...(options.compilerOptions || {}),
        isCustomElement: (tag) => /^micro-app/.test(tag)
      }
      return options
    })
}
