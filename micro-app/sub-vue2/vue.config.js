const { defineConfig } = require('@vue/cli-service')
process.env.APP_ROOT_PATH = process.cwd()
const devServer = require('@xigefish/build/dev-server') // 开发环境服务配置
module.exports = defineConfig({
  devServer,
  transpileDependencies: true
})
