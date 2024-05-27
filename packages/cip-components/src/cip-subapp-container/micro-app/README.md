# micro-app 使用说明

## 父应用

```shell
# 安装依赖
npm i -S @micro-zoe/micro-app
yarn add @micro-zoe/micro-app
pnpm i -S @micro-zoe/micro-app
```

```js
// vue.config.js
const setCustomElement = require("@xigefish/components/cip-subapp-container/micro-app/set-custom-element");
chainWebpack: (config) => {
  setCustomElement(config);
};
// main.js
import microApp from "@micro-zoe/micro-app";

microApp.start();

// routes.js

import { generateSubRoutes } from "@xigefish/components/cip-subapp-container/micro-app/util";
const subAppRoutes = generateSubRoutes([
  { name: "meta", url: "/meta", baseRoute: "/meta" }, // 相对路径
  { name: "aim", uri: "http://127.0.0.1", baseRoute: "/aim" }, // 绝对路径
]);
```

## 子应用

> sub_modules/components 切换位 v4.x-beta 以上

```js
// main.js
import "@xigefish/components/cip-subapp-container/micro-app/public-path";
import { microAppRender } from "@xigefish/components/cip-subapp-container/micro-app/util";

if (window.__MICRO_APP_ENVIRONMENT__) {
  microAppRender(render);
} else {
  // 独立时的渲染方式
  console.time("render");
  render().then((res) => {
    console.timeEnd("render");
  });
}
```

```js
// /render/index.js

// 关键代码
const router = createRouter({
  // 子应用时采用内存方式记录路由
  history: routerBase
    ? createMemoryHistory(routerBase)
    : createWebHistory(process.env.BASE_URL),
  routes: routes,
});

return { instance, router };
```

```js
// judge-framework.js
if (window.__MICRO_APP_BASE_ROUTE__) return false;
```
