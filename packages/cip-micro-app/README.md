# @xigefish/micro-app

> 微应用架构

## setup

```base
yarn add @xigefish/micro-app
```

## vue3

```js
// main.js
import { microAppRender } from "@xigefish/micro-app/v3/sub";
// render支持异步，入参为基座下发的数据{routerBase, store}等，需要返回createApp的实例，和vue-router的实例即 { instance, router }
// subPages为非菜单页，即hideInMenu的页面，格式为 {name: '', pName: '', title: ''}
// 路由需要采用 createMemoryHistory
microAppRender(render, subPages);

// framework
import { useSubMenu } from "@xigefish/micro-app/v3/sub";

const menu = ref([]);
// 任意操作
if (window.__MICRO_APP_ENVIRONMENT__) {
  useSubMenu(menu); // 此时会同步基座的菜单
}
```
