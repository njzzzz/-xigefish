### 增加 typescript 支持步骤

1. 首先保证项目 git 是干净的状态，万一升级失败，方便回退
2. 升级项目的 vue-cli 版本
   ```bash
   vue upgrade
   // 或者
   npx vue upgrade
   ```
3. 增加 typescript 支持
   ```bash
   vue add typescript
   // 或者
   npx vue add typescript
   ```
   然后按照 prompt 问询回答问题就行（记得允许使用 js，不要将所有的.js 重写为.ts）
4. 查看 git 修改，有没有项目文件被删除等改动，自己按需调整
5. 删除 vue.config.js qiankunOutput(config.output)
6. 修改 tsconfig.json, 确保 compilerOptions.paths 映射准确
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["src/*"],
         "@xigefish/*": ["sub_modules/*"],
         "_config/*": ["config/*"]
       }
     }
   }
   ```
7. 过渡期间可以将 tsconfig 中 noImplicitAny 改为 false
   ```json
   {
     "compilerOptions": {
       "noImplicitAny": false
     }
   }
   ```
8. 如果是 history 路由，修改 vue.config.js 配置项中 devServer, historyApiFallback 配置为 true
   ```js
   {
     devServer: {
       ...devServer,
       historyApiFallback: true
     }
   }
   ```
9. 升级过程中会修改 eslint 配置，注意查一下，保证 extends 正确
10. webpack5 nodejs 相关的 api polyfill 不会被自动加入，如果有如下报错，按照他的提示改就行

    ```
      BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
    This is no longer the case. Verify if you need this module and configure a polyfill for it.

    If you want to include a polyfill, you need to:
            - add a fallback 'resolve.fallback: { "stream": require.resolve("stream-browserify") }'
            - install 'stream-browserify'
    If you don't want to include a polyfill, you can use an empty module like this:
            resolve.fallback: { "stream": false }
    ```
