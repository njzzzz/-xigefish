const customRootPath = require('app-root-path')
const appPath = customRootPath.path
const path = require('path')
exports.svgIconRule = (config, iconDir) => {
  const svgPath = path.resolve(appPath, iconDir)
  config.module.rule('svg').exclude.add(svgPath)
  config.module.rule('svg-icon')
    .test(/\.svg$/)
    .include.add(svgPath).end() // end用于退回到include
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
      symbolId: 'icon-[name]'
    })
}
