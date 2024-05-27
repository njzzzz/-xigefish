import curdMenu from './curd-menu'
import npmMenu from "./npm-menu";
export default [
  {
    name: '_changeLog',
    title: '更新日志',
    children: [
      {
        name: 'componentsChangelog',
        title: '@xigefish/components',
        icon: '<svg t="1701157905175" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1548" width="200" height="200"><path d="M853.333333 464.138667c0-71.253333-60.650667-129.013333-135.466666-129.013334 0-106.88-90.976-193.525333-203.2-193.525333-89.045333 0-164.714667 54.549333-192.170667 130.464-82.72 10.624-146.496 78.133333-146.496 159.818667 0 89.066667 75.818667 161.28 169.333333 161.28H717.866667c74.816 0 135.466667-57.770667 135.466666-129.024z" fill="#D3F2FF" p-id="1549"></path><path d="M738.24 315.050667C814.474667 324.586667 874.666667 386.901333 874.666667 464.138667c0 84-71.189333 150.346667-156.8 150.346666H345.333333c-104.309333 0-190.666667-80.778667-190.666666-182.602666 0-89.056 66.154667-162.090667 152.469333-178.933334 33.888-78.293333 114.4-132.693333 207.530667-132.693333 116.053333 0 212.970667 84.757333 223.573333 194.794667z m-20.373333 20.074666c74.816 0 135.466667 57.76 135.466666 129.013334 0 71.253333-60.650667 129.013333-135.466666 129.013333H345.333333c-93.514667 0-169.333333-72.202667-169.333333-161.269333 0-81.685333 63.776-149.194667 146.496-159.808 27.456-75.925333 103.125333-130.474667 192.170667-130.474667 112.224 0 203.2 86.645333 203.2 193.525333z" fill="#68B9DC" p-id="1550"></path><path d="M778.666667 348.810667c26.261333 23.530667 42.666667 56.938667 42.666666 93.994666 0 71.253333-60.650667 129.013333-135.466666 129.013334H313.333333c-29.077333 0-56.448-6.976-80.362666-19.274667 29.898667 25.269333 69.248 40.608 112.362666 40.608H717.866667c74.816 0 135.466667-57.76 135.466666-129.013333 0-50.432-30.378667-94.101333-74.666666-115.328z m-61.653334-31.594667c-6.24-64.725333-45.941333-120.224-102.485333-150.677333 43.658667 35.498667 71.338667 88.298667 71.338667 147.253333 10.72 0 21.141333 1.173333 31.146666 3.413333z" fill="#AAE0F8" p-id="1551"></path><path d="M347.989333 729.322667a47.274667 47.274667 0 1 1-94.549333 0 47.274667 47.274667 0 0 1 94.549333 0z" fill="#D3F2FF" p-id="1552"></path><path d="M369.322667 729.322667a68.608 68.608 0 1 1-137.216 0 68.608 68.608 0 0 1 137.216 0z m-68.608 47.274666a47.274667 47.274667 0 1 0 0-94.549333 47.274667 47.274667 0 0 0 0 94.549333z" fill="#68B9DC" p-id="1553"></path><path d="M446.762667 881.728a38.805333 38.805333 0 1 1-77.610667 0 38.805333 38.805333 0 0 1 77.610667 0z" fill="#D3F2FF" p-id="1554"></path><path d="M468.096 881.728a60.138667 60.138667 0 1 1-120.277333 0 60.138667 60.138667 0 0 1 120.277333 0zM407.957333 920.533333a38.805333 38.805333 0 1 0 0-77.610666 38.805333 38.805333 0 0 0 0 77.610666z" fill="#68B9DC" p-id="1555"></path><path d="M611.872 748.373333a60.682667 60.682667 0 1 1-121.365333 0 60.682667 60.682667 0 0 1 121.365333 0z" fill="#D3F2FF" p-id="1556"></path><path d="M633.205333 748.373333a82.016 82.016 0 1 1-164.032 0 82.016 82.016 0 0 1 164.032 0z m-82.016 60.682667a60.682667 60.682667 0 1 0 0-121.354667 60.682667 60.682667 0 0 0 0 121.354667z" fill="#68B9DC" p-id="1557"></path><path d="M775.552 786.474667a38.805333 38.805333 0 1 1-77.610667 0 38.805333 38.805333 0 0 1 77.610667 0z" fill="#D3F2FF" p-id="1558"></path><path d="M796.885333 786.474667a60.138667 60.138667 0 1 1-120.277333 0 60.138667 60.138667 0 0 1 120.277333 0zM736.746667 825.28a38.805333 38.805333 0 1 0 0-77.610667 38.805333 38.805333 0 0 0 0 77.610667z" fill="#68B9DC" p-id="1559"></path><path d="M556.298667 726.858667a20.810667 20.810667 0 1 1-41.632 0 20.810667 20.810667 0 0 1 41.632 0zM300.714667 715.584a13.738667 13.738667 0 1 1-27.477334 0 13.738667 13.738667 0 0 1 27.477334 0zM407.957333 872.917333a13.738667 13.738667 0 1 1-27.477333 0 13.738667 13.738667 0 0 1 27.477333 0zM743.072 776.597333a13.738667 13.738667 0 1 1-27.477333 0 13.738667 13.738667 0 0 1 27.477333 0z" fill="#EDFAFF" p-id="1560"></path><path d="M464 416a101.333333 101.333333 0 1 0-100.778667-90.656A100.906667 100.906667 0 0 0 330.666667 320c-53.013333 0-96 40.597333-96 90.666667s42.986667 90.666667 96 90.666666 96-40.597333 96-90.666666c0-0.597333 0-1.173333-0.021334-1.770667A101.066667 101.066667 0 0 0 464 416z" fill="#EDFAFF" p-id="1561"></path><path d="M789.333333 522.666667a10.666667 10.666667 0 1 1-21.333333 0 10.666667 10.666667 0 0 1 21.333333 0zM757.333333 554.666667a10.666667 10.666667 0 1 1-21.333333 0 10.666667 10.666667 0 0 1 21.333333 0zM649.333333 565.333333a10.666667 10.666667 0 1 1-21.333333 0 10.666667 10.666667 0 0 1 21.333333 0zM789.333333 453.333333a16 16 0 1 1-32 0 16 16 0 0 1 32 0zM832 480a10.666667 10.666667 0 1 1-21.333333 0 10.666667 10.666667 0 0 1 21.333333 0zM675.338667 504.330667a7.669333 7.669333 0 1 1-15.338667 0 7.669333 7.669333 0 0 1 15.338667 0zM729.333333 461.664a7.669333 7.669333 0 1 1-15.338666 0 7.669333 7.669333 0 0 1 15.338666 0zM832 437.333333a7.669333 7.669333 0 1 1-15.338667 0A7.669333 7.669333 0 0 1 832 437.333333zM621.333333 537.002667a7.669333 7.669333 0 1 1-15.338666 0 7.669333 7.669333 0 0 1 15.338666 0zM586.666667 562.336a7.669333 7.669333 0 1 1-15.338667 0 7.669333 7.669333 0 0 1 15.338667 0zM789.333333 398.666667a7.669333 7.669333 0 1 1-15.338666 0 7.669333 7.669333 0 0 1 15.338666 0zM704 549.333333a16 16 0 1 1-32 0 16 16 0 0 1 32 0zM748.672 510.005333a19.338667 19.338667 0 1 1-38.677333 0 19.338667 19.338667 0 0 1 38.677333 0z" fill="#75CEF3" p-id="1562"></path></svg>'
      },
      {
        name: 'stylesChangelog',
        title: '@xigefish/styles',
        icon: 'el-icon-house'
      },
      {
        name: 'pluginsChangelog',
        title: '@xigefish/plugins'
      },
      {
        name: 'dRenderPluginCciChangelog',
        title: '@xigefish/d-render-plugin-cci'
      },
      {
        name: 'xdpButtonChangelog',
        title: '@xigefish/button'
      }
    ]
  },
  {
    name: '_uiStandard',
    title: 'UI标准展示',
    children: [
      {
        name: '_base',
        title: '基础视觉样式',
        type: 'group',
        children: [
          {
            name: 'standardFont',
            title: '字体'
          },
          {
            name: 'standardColor',
            title: '颜色'
          },
          {
            name: 'standardBoxShadow',
            title: '阴影'
          }
        ]
      },
      {
        name: '_nav',
        title: '导航',
        type: 'group',
        children: [
          {
            name: 'componentHeaderNav',
            title: '顶部导航栏'
          },
          {
            name: 'componentAccordionMenu',
            title: '手风琴'
          },
          {
            name: 'componentBreadcrumb',
            title: '面包屑'
          },
          {
            name: 'componentPagination',
            title: '分页'
          },
          {
            name: 'componentSteps',
            title: '步骤条'
          },
          {
            name: 'componentTabs',
            title: '页签'
          }
        ]
      },
      {
        name: '_input',
        title: '数据输入',
        type: 'group',
        children: [
          {
            name: 'componentButton',
            title: '按钮'
          },
          {
            name: 'componentInput',
            title: '输入框'
          },
          {
            name: 'componentCheckbox',
            title: '单选/多选框'
          },
          {
            name: 'componentSelect',
            title: '选择器'
          },
          {
            name: 'componentSearch',
            title: '搜索'
          },
          {
            name: 'componentTimePicker',
            title: '时间选择器'
          },
          {
            name: 'componentSwitch',
            title: '开关'
          },
          {
            name: 'componentSlider',
            title: '滑动条'
          },
          {
            name: 'componentInputNumber',
            title: '数字输入'
          },
          {
            name: 'componentRate',
            title: '评分'
          },
          {
            name: 'componentUpload',
            title: '上传'
          }
        ]
      },
      {
        name: '_show',
        title: '数据展示',
        type: 'group',
        children: [
          {
            name: 'componentTable',
            title: '表格'
          },
          {
            name: 'componentCalendar',
            title: '日历'
          },
          {
            name: 'componentAvatar',
            title: '头像'
          },
          {
            name: 'componentCarousel',
            title: '走马灯'
          },
          {
            name: 'componentTooltip',
            title: '气泡提示'
          },
          {
            name: 'componentTree',
            title: '树形组件'
          },
          {
            name: 'componentTimeLine',
            title: '时间轴'
          },
          {
            name: 'componentTag',
            title: '标签'
          }
        ]
      },
      {
        name: '_feedback',
        title: '反馈',
        type: 'group',
        children: [
          {
            name: 'componentNotification',
            title: '通知框'
          },
          {
            name: 'componentMessage',
            title: '全局提示'
          },
          {
            name: 'componentDialog',
            title: '对话框'
          },
          {
            name: 'componentMessageBox',
            title: 'MessageBox对话框'
          },
          {
            name: 'componentLoading',
            title: '加载器'
          },
          {
            name: 'componentBadge',
            title: '小红点'
          },
          {
            name: 'componentAlert',
            title: '警报'
          }
        ]
      }
    ]
  },
  {
    name: '_components',
    title: '基础组件',
    children: [

      {
        name: 'componentCountUp',
        title: '动态数字变化'
      },
      {
        name: 'componentAutocomplete',
        title: 'autocomplete'
      },
      {
        name: 'componentCancelLoading',
        title: '可取消Loading'
      },
      {
        name: 'componentCodeMirror',
        title: '代码编辑器'
      },
      {
        name: 'componentCron',
        title: 'cron表达式'
      },
      {
        name: 'componentImage',
        title: '图片'
      },
      {
        name: 'componentInputSwitch',
        title: 'input-switch组件'
      },
      {
        name: 'componentOverflow',
        title: '文本溢出'
      },
      {
        name: 'componentTableButton',
        title: '表格按钮'
      },
      {
        name: 'componentTableHandle',
        title: '表格操作'
      },
      {
        name: 'componentSearchInput',
        title: '搜索框'
      },
      {
        name: 'componentSelectTable',
        title: '可选表格',
        badge: '4.x new'
      },
      {
        name: 'componentSvgIcon',
        title: 'svg图标'
      },
      {
        name: 'componentTimeSelect',
        title: 'time select'
      },
      {
        name: 'componentUrlEditor',
        title: 'url输入组件'
      }
    ]
  },
  {
    name: '_dRender',
    title: 'DRender组件',
    children: [
      {
        name: '_form',
        title: 'CipForm',
        children: [
          { name: 'dRenderFormDependOn', title: '联动测试' },
          {
            name: 'formPC',
            title: 'PC',
            getBadge: () => Promise.resolve(Math.floor(Math.random() * 10))
          },
          {
            name: 'formMobile',
            title: 'Mobile'
          }
        ]
      },
      {
        name: '_table',
        title: 'CipTable',
        children: [
          {
            name: 'table',
            title: '基本',
            getBadge: () => Promise.resolve(Math.floor(Math.random() * 10))
          },
          {
            name: 'complexTable',
            title: '合并列'
          }
        ]
      },

      {
        name: '_searchForm',
        title: 'CipSearchForm',
        children: [
          {
            name: 'searchForm',
            title: 'Base'
          },
          {
            name: 'searchFormLabel',
            title: 'Label'
          }
        ]
      },
      {
        name: 'formDesign',
        route: '/form-design',
        isOpen: true,
        title: 'CipFormDesign'
      },
      {
        name: 'renderCipPage',
        title: 'cip-page'
      }
    ]
  },
  curdMenu,
  {
    name: '_pageLayout',
    title: '页面布局',
    children: [
      {
        name: 'pageLayoutList',
        title: 'List'
      },
      {
        name: 'pageLayoutHandle',
        title: 'Handle'
      },
      {
        name: 'pageLayoutInfo',
        title: 'Info'
      },
      {
        name: 'pageLayoutLeftRight',
        title: 'LeftRight'
      },
      {
        name: 'pageLayoutFreedom',
        title: 'Freedom'
      }
    ]
  },
  {
    name: '_migrationGuide',
    title: '迁移指南',
    children: [
      { name: 'migrationGuideV6', title: 'v6.x迁移指南' },
      { name: 'migrationGuideV5', title: 'v5.x迁移指南' },
      { name: 'migrationGuideV4', title: 'v4.x迁移指南' },
      { name: 'migrationGuideV3', title: 'v3.x迁移指南' },
      { name: 'migrationGuideV2', title: 'v2.x迁移指南' }
    ]
  },
  ...npmMenu
]
