// qiankun __webpack_public_path__ 修改
import '@xigefish/components/cip-subapp-container/micro-app/public-path'
import { microAppRender } from '@xigefish/components/cip-subapp-container/micro-app/util'
import { render } from '@/render/index.js'
// 用于覆盖element-plus不在支持iconfont导致的字体图标丢失的问题 须在element-plus的样式之前引入
import 'element-plus/dist/index.css'
import '@xigefish/styles/dist/index.css'
import '@xigefish/button/style'
import '@xigefish/d-render/dist/index.css'
import '@xigefish/plugins/element-icon/index.css'
import '@xigefish/d-render-plugin-cci-mobile/dist/index.css'
// 全局样式
import '@/style/global.less'
// iconfont
import '@/assets/icon/iconfont.css'
// svg-icon
import '@/assets/svg-icon'
import 'element-plus/theme-chalk/dark/css-vars.css'

import 'dayjs/locale/zh-cn'

import { DRender } from '@xigefish/d-render'
import renderConfig from '../d-render.config'
import { request } from '@xigefish/request'

import axiosConfig from '_config/axios-config'
import proxyConfig from '_config/proxy-config'
import CipMessage from '@xigefish/components/cip-message'

const dRender = new DRender()
dRender.setConfig(renderConfig)

request.setConfig({ ...axiosConfig, MessageError: CipMessage.error })
request.setApiConfig(proxyConfig)
request.use({ install: axiosConfig.customAxiosConfig })

if (window.__MICRO_APP_ENVIRONMENT__) {
  microAppRender(render)
} else {
  // 独立时的渲染方式
  console.time('render')
  render().then((res) => {
    console.timeEnd('render')
  })
}
