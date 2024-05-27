/**
 * @description 此文件用于生成按需引入的组件
 */
const chalk = require('chalk')
const fglob = require('fast-glob')
const { writeFileSync } = require('fs-extra')
const { sep } = require('path')
const dirs = fglob.sync('./src/*', { onlyDirectories: true }).map(item => item.split(sep).pop())
// 以下不提供按需引入
const excludeDir = [
  'cip-form-input',
  'directives',
  'helper',
  'hooks',
  'migration',
  'store',
  'styles',
  'cip-subapp-container',
  'v3.bak',
  'page-layout'
]
dirs.forEach(dir => {
  if (excludeDir.includes(dir)) return
  const name = dir.split('-').reduce((acc, item) => {
    acc += item[0].toUpperCase() + item.substring(1)
    return acc
  }, '')
  const filename = dir
  const content = `import { DefineComponent } from 'vue'
//@ts-ignore
const component: DefineComponent<{},{},any>
export default component
    `
  // content += `export { default as ${name} } from './${dir}'\n`
  try {
    writeFileSync(`./types/${filename}.d.ts`, content, 'utf-8')

    console.log(
      chalk.green(`generate ${filename}.d.ts success !`)
    )
  } catch (error) {
    console.log(error)
  }
})

// 表单设计弹框特殊引入