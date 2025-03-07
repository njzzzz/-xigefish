const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const events = require('events')
events.EventEmitter.defaultMaxListeners = 0// .setMaxListeners(0)
const NODE_ENV = process.env.NODE_ENV || 'development'
const BuildVersionWebpackPlugin = require('build-version-webpack-plugin')
process.env.APP_ROOT_PATH = process.cwd()
console.log('NODE_ENV', NODE_ENV)
validProductionApi() // 验证开发环境api地址是否已填写
const circularCheck = require('@xigefish/build/circular-check')
const devServer = require('@xigefish/build/dev-server') // 开发环境服务配置
const { vueAlias, webpackAlias } = require('@xigefish/build/alias') // 文件别名配置
const { svgIconRule } = require('@xigefish/build/svg-icon')
// const { qiankunOutput } = require('./build/qiankun-output')
console.log(webpackAlias)
const staticGzip = require('@xigefish/build/static_gzip') // 生成静态gzip文件
// 从command中获取publicPath、outputDir
const { publicPath = '/', outputDir = 'dist', assetsDir } = getParamsFromCommand(process.argv)
module.exports = defineConfig({
  publicPath,
  assetsDir, // 智能平台的需要使用public
  outputDir,
  transpileDependencies: [
    // '@xigefish/components',
    // '@xigefish/d-render',
    // '@@xigefish/d-render'
  ],
  lintOnSave: false,
  productionSourceMap: false,
  devServer, // 开发服务配置
  // css: {
  //   extract: true
  // },
  pluginOptions: { // 全局注入less变量
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        require.resolve('@xigefish/styles/theme/variate'),
        // path.resolve(__dirname, 'sub_modules/components/styles/variate.less'),
        path.resolve(__dirname, 'src/style/variate.less')
      ]
    }
  },
  chainWebpack: config => {
    vueAlias(config.resolve.alias) // 文件别名配置
    svgIconRule(config, path.resolve(__dirname, 'src/assets/svg-icon'))
    config.module.rule('md').test(/\.md$/).use().loader(path.resolve(__dirname, './loaders/markdown-loader.js')).end()
    config.plugin('html').tap(args => {
      args[0].title = process.env.VUE_APP_PLATFORM_NAME
      return args
    })
    config.when(NODE_ENV !== 'development', config => {
      config.optimization.minimizer('terser').tap(args => {
        args[0].terserOptions.compress.drop_console = true
        return args
      })
    })
    return config
  },
  configureWebpack: config => {
    // qiankunOutput(config.output) // 乾坤子应用设置output
    circularCheck(config.plugins) // 检查循环依赖
    if (NODE_ENV !== 'development') {
      staticGzip(config.plugins) // 静态gzip压缩
      config.plugins.push(new BuildVersionWebpackPlugin()) // 打包git信息
    }
  }
})

/**
 * 获取打包时输入的参数
 * @param argv {Array<String>}
 * @return 参数对象 {Object}
 */
function getParamsFromCommand (argv) {
  const item = {}
  if (NODE_ENV !== 'development') {
    let arr = []
    argv.forEach((v, k) => {
      if (k > 2) {
        arr = v.replace('--', '').split('=')
        item[arr[0]] = arr[1]
      }
    })
  }
  console.log(item)
  return item
}

/**
 * production打包时检查proxy是否配置生产环境地址
 */
function validProductionApi () {
  if (NODE_ENV === 'production') {
    const proxyConfig = require(path.resolve(__dirname, 'config/proxy-config'))
    proxyConfig.forEach(config => {
      if (!config.productionTarget) {
        console.error(`error:${config.key}生产环境地址未配置`)
        require('process').exit(1)
      }
    })
  }
}
