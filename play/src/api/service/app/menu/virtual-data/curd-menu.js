const common = [
  {
    name: 'curdBasicCurd',
    title: '列表',
    router: true,
    children: [
      {
        name: 'curdBasicReallyInfo',
        title: '详情',
        hideInMenu: true
      }
    ]
  },
  // {
  //   name: 'curdBasicReallyInfo',
  //   title: '详情',
  //   hideInMenu: true
  // },
  {
    name: 'curdBasicInputSearchModelCurd',
    title: '单个查询列表',
    children: [
      {
        name: 'curdBasicReallyInfo',
        title: '详情',
        hideInMenu: true
      }
    ]
  },
  {
    name: 'curdBasicHandle',
    title: '处理'
  },
  {
    name: 'curdBasicInfo',
    title: '详情'
  },
  {
    name: 'curdBasicInfoList',
    title: '详情列表'
  },
  {
    name: 'curdBasicLeftRight',
    title: '左右列表'
  },
  {
    name: 'curdBasicLeftRightInfo',
    title: '左右详情'
  },
  {
    name: 'curdBasicLeftRightHandle',
    title: '左右操作'
  },
  {
    name: 'curdBasicLeftRightInfoList',
    title: '左右详情列表'
  }
]

const getThemeMenu = (common, theme) => {
  return common.map(v => {
    const item = { ...v }
    item.name = v.name.replace('Basic', theme)
    return item
  })
}

export default {
  name: '_curd',
  title: 'CURD集成页',
  children: [
    {
      name: '_autoCurd',
      title: '自动变化主题的CURD',
      icon: '<?xml version="1.0" encoding="UTF-8"?><svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">    <defs>        <circle id="path-1" cx="10" cy="10" r="10"></circle>        <linearGradient x1="28.0213604%" y1="18.7750147%" x2="85.7988166%" y2="100%" id="linearGradient-17010696397933">            <stop stop-color="#104DF0" offset="0%"></stop>            <stop stop-color="#2F80F5" offset="34.668841%"></stop>            <stop stop-color="#08C1FC" offset="100%"></stop>        </linearGradient>    </defs>    <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">        <g id="icon" transform="translate(-45.000000, -127.000000)">            <g id="编组-7" transform="translate(33.000000, 114.000000)">                <g id="编组-26" transform="translate(12.000000, 13.000000)">                    <mask id="mask-17010696397932" fill="white">                        <use xlink:href="#path-1"></use>                    </mask>                    <g id="椭圆形"></g>                    <g id="编组-28" mask="url(#mask-17010696397932)">                        <g transform="translate(4.000000, 3.500000)">                            <path d="M2.5,3.5 C3.05228475,3.5 3.5,3.94771525 3.5,4.5 L3.5,6 C3.5,6.55228475 3.05228475,7 2.5,7 C1.94771525,7 1.5,6.55228475 1.5,6 L1.5,4.5 C1.5,3.94771525 1.94771525,3.5 2.5,3.5 Z" id="矩形" fill="#FFFFFF"></path>                            <path d="M2,0 L9,0 C10.1045695,-2.02906125e-16 11,0.8954305 11,2 L11,11 C11,12.1045695 10.1045695,13 9,13 L2,13 C0.8954305,13 1.3527075e-16,12.1045695 0,11 L0,2 C-1.3527075e-16,0.8954305 0.8954305,2.02906125e-16 2,0 Z" id="形状结合" fill="url(#linearGradient-17010696397933)"></path>                            <path d="M3,2 L4.5,2 C5.05228475,2 5.5,2.44771525 5.5,3 C5.5,3.55228475 5.05228475,4 4.5,4 L3,4 C2.44771525,4 2,3.55228475 2,3 C2,2.44771525 2.44771525,2 3,2 Z" id="矩形" fill="#FFFFFF"></path>                            <path d="M11.3916614,4.22160533 C11.8342002,3.7282637 12.5928812,3.68707988 13.0862228,4.12961869 C13.5581148,4.55291668 13.6163123,5.26546386 13.2331913,5.75837425 L13.1782095,5.82418012 L9.06750108,10.4067919 C9.03281035,10.4454651 8.99636507,10.4825277 8.95827997,10.517863 C8.29374065,11.1344225 7.26810128,11.1181291 6.62338642,10.4967731 L6.55580125,10.4278852 L4.83154747,8.56945234 C4.38078548,8.08361267 4.40922156,7.324347 4.89506123,6.87358501 C5.36065759,6.44160477 6.07736913,6.44972137 6.53301862,6.87875271 L6.59092856,6.93709878 L7.79287971,8.23301002 L11.3916614,4.22160533 Z" id="路径-5" fill="#0FE4CE"></path>                            <path d="M10.9992328,4.6595 L10.9992328,8.2525 L9.06750108,10.4067919 C9.03281035,10.4454651 8.99636507,10.4825277 8.95827997,10.517863 C8.29374065,11.1344225 7.26810128,11.1181291 6.62338642,10.4967731 L6.55580125,10.4278852 L4.83154747,8.56945234 C4.38078548,8.08361267 4.40922156,7.324347 4.89506123,6.87358501 C5.36065759,6.44160477 6.07736913,6.44972137 6.53301862,6.87875271 L6.59092856,6.93709878 L7.79287971,8.23301002 L10.9992328,4.6595 Z" id="形状结合" fill="#0033FF"></path>                        </g>                    </g>                </g>            </g>        </g>    </g></svg>',
      children: [
        ...common,
        {
          name: 'curdCustomTableHandle',
          title: '自定义表单操作按钮'
        },
        {
          name: 'curdOutParamsTable',
          title: '带外部参数的CURD'
        }
      ]
    },
    {
      name: '_standardTheme',
      title: '研究院主题',
      badge: '4.2',
      icon: 'el-icon-house',
      children: getThemeMenu(common, 'Standard')
    },
    {
      name: '_DgTheme',
      title: '东莞主题',
      badge: '4.2',
      icon: 'el-icon-house',
      children: getThemeMenu(common, 'Dg')
    },
    {
      name: '_SupergravityTheme',
      title: '超重力主题',
      badge: '4.2',
      icon: 'el-icon-house',
      children: getThemeMenu(common, 'Supergravity')
    }
  ]
}
