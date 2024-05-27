const customRootPath = require('app-root-path')
const reqlib = customRootPath.require
const proxyConfig = reqlib('./config/proxy-config')
const dayjs = require('dayjs')
const chalk = require('chalk')
console.log(proxyConfig)
const proxy = buildProxy(proxyConfig)
module.exports = {
  port: process.env.VUE_APP_PORT || 8080,
  headers: {
    'Access-Control-Allow-Origin': '*' // 主应用获取子应用时跨域响应头
  },
  // overlay: {
  //   warnings: false
  // },
  proxy
}

/**
 * 根据proxyConfig 生成proxy
 * @param {Array} proxyConfig
 *
 */
function buildProxy (proxyConfig = []) {
  const proxy = {}
  proxyConfig.forEach(config => {
    let pathRewrite = {}
    if (config.pathRewrite === undefined) {
      pathRewrite[`^/${config.key}`] = ''
    } else {
      pathRewrite = config.pathRewrite
    }
    proxy[`/${config.key}`] = {
      target: config.target,
      changeOrigin: true,
      pathRewrite,
      bypass: function (req, res, proxyOptions) {
        if (new RegExp(`/${config.key}`).test(req.url)) {
          const pathRewrite = proxyOptions.pathRewrite
          const sourceUrl = req.url
          const targetUrl = proxyOptions.target + getProxyUrl(req.url, pathRewrite)
          console.log(`[${chalk.green(dayjs().format('YYYY-MM-DD HH:mm:ss'))}] ${req.method}  ${sourceUrl} => ${targetUrl}`)
        }
      }
    }
  })
  return proxy
}

function getProxyUrl (url, pathRewrite = {}) {
  Object.keys(pathRewrite).forEach((regexpString) => {
    const reg = new RegExp(regexpString)
    url = url.replace(reg, pathRewrite[regexpString])
  })
  return url
}
