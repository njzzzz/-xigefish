const fs = require('fs')
const path = require('path')
const childProcess = require('child_process')
const chalk = require('chalk')
const rootPath = process.env.INIT_CWD
const commandParams = getVersionInfoFromCommand(process.argv)

if (!rootPath) {
  console.error('未在package.json中执行此命令')
  process.exit(1)
}
const version = process.env.npm_package_version
if (!version) {
  console.error('未获取version信息')
  process.exit(1)
}
// 生成新的版本号
const nextVersion = commandParams.nextVersion ? commandParams.nextVersion : updateVersion(version, commandParams.versionType)
// 写入package
const packagePath = path.resolve(rootPath, 'package.json')
writeNextVersion(nextVersion, packagePath)
console.log(`package.json version ${chalk.red(nextVersion)} 写入成功`)
generateChangeLog(nextVersion)
generateTag(nextVersion)
// 写入package.json and pack-lock.json
/**
 *
 * @param version {string} x.x.x
 * @param type {'patch' | 'minor' | 'major'}
 */
function updateVersion (version, type) {
  const arr = version.split('.')
  switch (type) {
    case 'patch':
      arr[2]++
      break
    case 'minor':
      arr[2] = 0
      arr[1]++
      break
    case 'major':
      arr[2] = 0
      arr[1] = 0
      arr[0]++
      break
    default:
      arr[2]++
  }
  return arr.join('.')
}

function writeNextVersion (version, filePath) {
  const buffer = fs.readFileSync(filePath)
  const data = JSON.parse(buffer.toString())
  data.version = version
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

function generateChangeLog (version) {
  // 生成日志
  childProcess.execSync('npx conventional-changelog -p zentao -i CHANGELOG.md -s -r 0')
  // 提交git
  childProcess.execSync(`git add CHANGELOG.md package.json && git commit -m"docs: ${version}版本更新"`)
}
function generateTag (version) {
  childProcess.execSync(`git tag v${version} `)
}

function getVersionInfoFromCommand (argv) {
  const params = {}
  const arg = argv[2]
  if (['patch', 'minor', 'major'].includes(arg)) {
    params.versionType = arg
  } else if (/^([1-9]\d|[1-9])(.([1-9]\d|\d)){2}$/.test(arg || '')) {
    params.nextVersion = arg
  } else {
    console.error('当前值为:', chalk.red(arg), '版本必须为', chalk.red('patch、minor、major 或 x.x.x, 其中x为自然数不支持以0开通'))
    process.exit(0)
  }
  return params
}
