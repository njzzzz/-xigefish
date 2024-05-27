# @xigefish/components

## 6.0.66

### Patch Changes

- fix(cip-page-curd): 修复 autoSelected 无法控制默认请求的问题

## 6.0.65

### Patch Changes

- feat: 1 修复上传文件 status 的问题\n 2 修复 framework 新增路由切换时滚动条滚动至顶部的功能

## 6.0.64

### Patch Changes

- fix(cip-upload): 修复取消文件上传时未取消 uploadQueue 中的标记的问题
  - @xigefish/hooks@6.0.2

## 6.0.63

### Patch Changes

- refactor(main): 重构页面缓存逻辑
  - @xigefish/hooks@6.0.2

## 6.0.62

### Patch Changes

- feat(main): 当 withTab 为 false 时点击菜单后直接清空 opened&cache tab
  - @xigefish/hooks@6.0.2

## 6.0.61

### Patch Changes

- polish: 更新 form-dialog 添加 label-position 参数
  - @xigefish/hooks@6.0.2

## 6.0.60

### Patch Changes

- chore: ccinpm 仓库异常重新发包
- Updated dependencies
  - @xigefish/hooks@6.0.2
  - @xigefish/request@6.0.2
  - @xigefish/shared@5.0.2
  - @xigefish/styles@6.1.10
  - @xigefish/d-render-shared@6.0.2
  - @xigefish/page-layout@1.0.5
  - @xigefish/page-layout-shared@1.0.7

## 6.0.59

### Patch Changes

- chore: npm 私有仓库故障重新发包
- Updated dependencies
  - @xigefish/hooks@6.0.1
  - @xigefish/request@6.0.1
  - @xigefish/shared@5.0.1
  - @xigefish/styles@6.1.5
  - @xigefish/d-render-shared@6.0.1
  - @xigefish/page-layout@1.0.4
  - @xigefish/page-layout-shared@1.0.6

## 6.0.58

### Patch Changes

- feat(cip-main-icon): 渲染 svgString 时加入防 xss 功能
  - @xigefish/hooks@6.0.0

## 6.0.57

### Patch Changes

- feat(main): nav 支持 svg 字符串作为 icon
- Updated dependencies
  - @xigefish/styles@6.1.4

## 6.0.56

### Patch Changes

- fix(cip-tab-plus): 修复不接受 el-tabs 事件问题
  - @xigefish/hooks@6.0.0

## 6.0.55

### Patch Changes

- 71bb9b1: feat(cip-dialog): 抽屉模式支持`quirks`怪异模式
- Updated dependencies [b2e35c6]
- Updated dependencies [71bb9b1]
- Updated dependencies [0da3925]
- Updated dependencies [d33c18c]
  - @xigefish/d-render-shared@6.0.0
  - @xigefish/hooks@6.0.0
  - @xigefish/request@6.0.0
  - @xigefish/styles@6.1.3
  - @xigefish/button@1.2.1
  - @xigefish/config@1.0.2

## 6.0.55-beta.0

### Patch Changes

- feat(cip-dialog): 抽屉模式支持`quirks`怪异模式
- Updated dependencies
  - @xigefish/styles@6.1.3-beta.0
  - @xigefish/hooks@5.0.3-beta.2
  - @xigefish/request@5.0.7-beta.2

## 6.0.54

### Patch Changes

- feat(use-back): 修复`useBack`在多级子页面时，调用返回函数无法回到预期页面的问题

## 6.0.53

### Patch Changes

- feat(main): 扩展 main 的配置`navMenuAttrs`扩展 nav 的配置` uniqueOpened``defaultOpeneds `

## 6.0.52

### Patch Changes

- chore: 重新发布

## 6.0.51

### Patch Changes

- fix(cip-upload): 存储的文件对象开启 size 及 type 记录

## 6.0.50

### Patch Changes

- fix(cip-page-curd): 新增 layoutAttr

## 6.0.49

### Patch Changes

- fix(page-layout): 修改 page-layout 配置参数

## 6.0.48

### Patch Changes

- feat(cip-upload): 上传函数支持 Promise

## 6.0.47

### Patch Changes

- page-layout 新增参数

## 6.0.46

### Patch Changes

- 2f19bbb: cip-page-curd 新增参传入

## 6.0.45

### Patch Changes

- fix(@xigefish/components): [package.json]调整对@xigefish/button 的版本

## 6.0.44

### Patch Changes

- feat(@xigefish/components): [cip-page-curd]删除按钮支持 popconfirm

## 6.0.43

### Patch Changes

- fix(types): 修复`cip-pagination.d.ts`的类型错误

## 6.0.42

### Patch Changes

- feat(main): top-left 模式支持一级菜单为 item 时隐藏侧边栏

## 6.0.41

### Patch Changes

- df19e53: refactor(\*): 将组件中直接使用 el-icon 的 iconfont 修改为 svg icon
- Updated dependencies [df19e53]
  - @xigefish/styles@6.1.1

## 6.0.40

### Patch Changes

- scope

- @xigefish/styles
- @xigefish/button
- @xigefish/components

1. 需要单独引入@xigefish/button 的样式

- Updated dependencies
- Updated dependencies [32bf612]
  - @xigefish/styles@6.1.0
  - @xigefish/button@1.1.2
  - @xigefish/request@5.0.5

## 6.0.39

### Patch Changes

- fix(micro-app&main): 修复多子页面菜单选中以及面包屑会退功能

## 6.0.38

### Patch Changes

- fix(@xigefish/components): usePageConfig 获取位置错误的问题
- Updated dependencies
  - @xigefish/page-layout-shared@1.0.2

## 6.0.37

### Patch Changes

- fix(\*): 修复@xigefish/shared 为作为生产依赖自定安装，导致构建报错的问题

## 6.0.36

### Patch Changes

- fix(@xigefish/components): [cip-cron]修复 use-cron-item2 个 watch 未设置先后顺序导致的无限循环的 bug

## 6.0.35

### Patch Changes

- fix(page-layout): 修复 page-layout 重 cipConfig 中取值的方式

## 6.0.34

### Patch Changes

- fix(cip-form-dialog): 修复 cip-form-dialog 的引入问题

## 6.0.33

### Patch Changes

- fix(\*): 标准化从 cipConfig 中去值的方式

## 6.0.32

### Patch Changes

- fix(cip-page-curd): 支持对 searchForm 的 grid 控制

## 6.0.31

### Patch Changes

- chore(@xigefish/components): 将@xigefish/config 作为生产依赖

## 6.0.30

### Patch Changes

- refactor(@xigefish/components): 重构 cip-config-provide 的实现
- feat(@xigefish/button): 增加 config-provide 可配置内容
- feat(@xigefish/config): 新增 XdpConfigProvide、useConfig
- feat(@xigefish/d-render-shared): 新增一些@xigefish 需要使用的基础工具
- Updated dependencies
  - @xigefish/button@1.1.0
  - @xigefish/config@1.0.1

## 6.0.29

### Patch Changes

- fix(cip-page-curd): 修复对@xigefish/page-layout 的引用错误

## 6.0.28

### Patch Changes

- refactor(page-layout): 重构@xigefish/components/page-layout 将其从@xigefish/components 分离为@xigefish/page-layout + @xigefish/page-layout-themes
- Updated dependencies
  - @xigefish/styles@6.0.13
  - @xigefish/page-layout@1.0.1

## 6.0.27

### Patch Changes

- fix(components): [page-layout] 修复组件 back loading 部分无效的问题
- feat(components): [cip-config-provide] 新增 tooltip 属性

## 6.0.26

### Patch Changes

- fix(components): 修复 cip-form-validate 在特殊情况下无法正确获取到 form vnode 的问题

## 6.0.24

### Patch Changes

- fix(components): 修复 page-layout 中 left-right 面包屑样式异常的问题
- Updated dependencies
  - @xigefish/styles@6.0.12

## 6.0.23

### Patch Changes

- main 组件支持单个页面匹配时忽略 query

## 6.0.22

### Patch Changes

- refactor: 优化依赖及依赖组件引入方式

## v6.1.19 [2023-06-12]

- broken

  - `page-layout`内置的返回逻辑从直接调用 closeTab 修改为先寻找是否有可选择的父级，再使用 closeTab

- feat
  - `main`组件再不设置 homeView 时将自动将可使用的第一个菜单项作为 homeView
  - `main`新增`rootPath`,当路由处于 rootPath 时 main 组件将自动跳转到第一个可用的菜单项
  - `main`新增内置特殊处理的 route name lowCodePage,当名称为此是菜单的匹配模式将修改为路径
- refactor
  - `mian`重构`nav`、`breadcrumn`、`tabs`的匹配方式，由原先的各自内部处理修改为 provide 统一下发

## v4.2.26 [2023-02-22]

- feat
  - `cip-search-form`当渲染`labelPosition`为`top`时，最小列宽为`225`

## v4.2.25 [2023-02-21]

- feat
  - `cip-tree`的`config.renderNode`入餐修改为`data,node,store`

## v4.2.24 [2023-02-14]

- fix
  - 修复`cip-pagination`在 limit 为 0 是第一页也不存在的问题

## v4.2.23 [2023-02-10]

- feat
  - `cip-upload`支持对文件的大小、类型、数量的校验

## v4.2.22 [2023-02-09]

- feat
  - `cip-main-nav`支持溢出按钮&滚轮滑动

## v4.2.21 [2023-02-03]

- fix
  - 修复`page-layout/list/standard`组件页面底部留白位置不符合标准的问题

## v4.2.20 [2023-02-03]

- fix
  - 修复`cip-dialog`组件 header 部分样式未完全符合 UI 标准的问题

## v4.2.19 [2023-01-31]

- fix
  - 修复`page-layout/list/standard`组件无搜索条件的页面上边留白距离不符合标准的问题

## v4.2.18 [2023-01-30]

- fix
  - 修复`cip-dialog`组件`size`属性不生效的问题

## v5.2.0-beta [2022-12-30]

- feat
  - 使用 npm 包的形式引入

## v4.2.17 [2023-01-11]

- fix
  - 修复`main-theme`中`--cip-main-bg`未设置默认值导致的样式异常

## v4.2.16 [2023-01-11]

- feat
  - 新增主题`supergravity`
  - 新增布局主题`supergravity`
- refactor
  - 重构`main-theme`的实现采用 css 变量
  - cip-styles 采用子模块的方式引入使用 v5.2.x 分支与 v5 版本的样式保持一支

## v4.2.15 [2022-12-14]

- feat
  - 新增`cip-search-tags`组件，[example](http://10.162.16.21:8082/components/select)
- refactor
  - 调整`cip-styles`内部的样式引入逻辑
  - 重构`cip-form`和`cip-search-form`的`labelPosition`的实现方式，不再依赖`el-form`

## v4.2.14 [2022-12-12]

- fix
  - **_cip-form-item_**: 修复`labelPosition`的值不等于`top`时不生效的问题

## v4.2.13 [2022-12-12]

- fix
  - 修复 cron 表达式年的表达式问题
  - 修复 4.2.12 版本样式引入不完全的问题

## v4.2.12 [2022-12-09]

- feat
  - page-layout 组件允许通过`canBack`控制返回按钮的展示状态
  - `cip-form-design` `dependOn` 开放对自己的选择
- refactor
  - 提取所有组件的样式到`cip-styles`并在 `@xigefish/components/style` 中自动引入

## v4.2.11 [2022-12-09]

- fix
  - 修复 table 列设置居中后数据不居中的问题

## v4.2.10 [2022-12-08]

- refactor
  - 重构 cip-cron 选择面板
- feat
  - 新增 cip-cron-select 选择器
  - 表单设计器支持配置性的 changeConfig 和 changeValue
- fix
  - 修复`select/view.jsx`组件在在数据为数组且`splitKey`未设置时插入`undefined`的问题

## v4.2.9

- fix
  - 修复 form-design 删除最后一项导致第一个配置项变为空对象的问题
  - 修复 cip-pagination 计算 pageCount 使用 round 导致异常的问题
- feat
  - form-item-rules 新增一个 customValidators 的数组属性
    - customValidators:
  - form-design 表单设计数据依赖函数提供代码提示
