const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const rootPath = process.cwd()
const customRootPath = {
  resolve: (...args)=> path.resolve(rootPath, ...args)
}
const getParamByText = (string, key, splitKey)=> {
  const regex = new RegExp(`${key}${splitKey}(.*)`)
  return string.match(regex)
}
// const customRootPath = require('app-root-path')
const gitPath = path.resolve(rootPath, './.git')
const stat = fs.statSync(gitPath)
let msgPaths = ''
console.log('isDirectory', stat.isDirectory())
const fileName = 'COMMIT_EDITMSG'
if(stat.isDirectory()){
  msgPaths = customRootPath.resolve('./.git')
} else if(stat.isFile()) {
  const gitEnvParams = fs.readFileSync(gitPath).toString()
  const relativePath = getParamByText(gitEnvParams, 'gitdir', ':')[1] || ''
  console.log(relativePath)
  msgPaths = customRootPath.resolve(`${relativePath.trim()}`)
}
console.log(msgPaths)
// 获取.git如果是文件夹则直接使用内部的COMMIT_EDITMSG
// 如果是文件，则读取文件然后 读取customRootPath.resolve(content/COMMIT_EDITMSG)
const msg = require('fs').readFileSync(msgPaths+'/COMMIT_EDITMSG', 'utf-8').trim()
const commitRE = /^(\d+\.\d+\.\d+(-\d+)?)|(revert: )?(feat|fix|update|polish|docs|style|refactor|perf|test|workflow|ci|chore|types|build|clear)(\(.+\))?: .{1,50}/

if (msg.includes('Merge branch')) {

} else {
  console.log(`提交的信息是：${chalk.green(msg)}`)
  if (!commitRE.test(msg)) {
    console.log(msg)
    console.error(
      `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red('invalid commit message format.')}\n\n` +
      chalk.red('  Proper commit message format is required for automated changelog generation. Examples:\n\n') +
      `    ${chalk.green('feat(compiler): add \'comments\' option')}\n` +
      `    ${chalk.green('fix(v-model): handle events on blur (close #28)')}\n\n` +
      chalk.red(`  You can also use ${chalk.cyan('npm run commit')} to interactively generate a commit message.\n`)
    )
    process.exit(1)
  }
}
