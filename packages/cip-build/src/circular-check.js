const CircularDependencyPlugin = require('circular-dependency-plugin')
module.exports = (plugins) => {
  plugins.push(new CircularDependencyPlugin({
    include: /src\/api/,
    allowAsyncCycles: true,
    // `onStart` 在循环检测开始前调用。
    onStart ({ compilation }) {
      console.log('start detecting webpack modules cycles')
    },
    // `onDetected` 检测到有模块循环时调用。
    onDetected ({ module: webpackModuleRecord, paths, compilation }) {
      // `paths` 是出现循环引用的相对模块路径的数组。
      // `module` 是 webpack 生成的导致循环依赖的模块记录
      compilation.errors.push(new Error(paths.join(' -> ')))
    },
    // `onEnd` 会在循环检测结束后调用
    onEnd ({ compilation }) {
      console.log('end detecting webpack modules cycles')
    }
  }))
}
