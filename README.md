## cip-plus

> cip-plus 下包含以库， 每个库可单独安装

- @xigefish/build 构建相关
- @xigefish/components 基础组件
- @xigefish/hooks 常用 hooks
- @xigefish/plugins 插件
- @xigefish/request 请求库
- @xigefish/scripts node 脚本
- @xigefish/styles 基础样式
- @xigefish/d-render-shared 常用工具函数
- play 为演示环境

#### 如何使用？

1. 安装 pnpm

```
npm install pnpm -g
```

2. 安装依赖

```
pnpm install
```

3. 构建 esm

```
pnpm run build-all
```

4. 运行对应项目监听，如：@xigefish/d-render-design

```
pnpm run dev:@xigefish/d-render-design
```

5.新开一个终端，运行 play（演示环境）

```
pnpm run demo
```

### 如何发布组件

⚠️ 先打包

1. 打开控制台，在根目录(cip-plus)输入

```
changeset
```

⬇️ 选择需要更新的包名, 按空格键选中，在 summary 中输入更新说明

2. 控制台输入

```
changeset version
```

3. git 提交变更记录, 例子：

```
git add .
git commit -m 'docs(changelog): @xigefish/page-layout-theme-dg'
```

4. 发布，以@xigefish/page-layout-theme-dg 为例

```
pnpm publish -r --filter=@xigefish/page-layout-theme-dg
```
