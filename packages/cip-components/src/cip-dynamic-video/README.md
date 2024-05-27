# CipDynamicVideo

> 动态地址的 h5 视频播放器

## Attributes

| 参数     | 说明         |  类型   | 可选值 | 默认值 |
| :------- | :----------- | :-----: | :----- | :----- |
| src      | 视频地址     | string  |        | -      |
| autoplay | 是否自动播放 | boolean |        | false  |

## example

```js
// proxy-config.js
// proxyConfig 数据
const proxyConfig = [
  { key: "api", target: "http://0.0.0.0:8080", productionTarget: "/api" },
];
```

```jsx
import CipDynamicVideo from "@xigefish/components/cip-dynamic-video";
// 在获取实际的地址时将根据proxyConfig的地址进行处理
// 测试环境地址为 http://0.0.0.0:8080/xxx.mp4
// 生产环境地址为 /api/xxx.mp4
<CipDynamicVideo src={"${api}/xxx.mp4"} />;
```

## authors

- [xmf](mailto:xmf@citycloud.com.cn)
