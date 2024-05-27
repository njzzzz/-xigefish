const fs = require('fs')
const os = require('os')
const path = require('path')
const INDEX = 'index.less'
// 写index文件
const writeFile = (files, filePath) => {
  const _content = files.reduce((total, current) => {
    try {
      const _filePath = path.resolve(__dirname, filePath, current)
      const stat = fs.lstatSync(_filePath)
      const _fileName = current.split('.')
      if (stat.isFile()) {
        // 将less文件写入到index.less
        (_fileName[1] === 'less' && _fileName[0] !== 'index') && (total += `@import './${current}';${os.EOL}`)
      } else {
        if (current !== 'theme') {
          total += `@import './${current}/index';${os.EOL}`
          readFile(_filePath)
        }
      }
    } catch (e) {
      console.log('请按正确的规则创建文件', e)
    }
    return total
  }, '')
  // 不存在index.less
  if (!files.includes('index.less')) {
    fs.writeFileSync(`${filePath}/${INDEX}`, _content)
  } else {
    // 存在则增量更新\
    updateFile(filePath, _content, files)
  }
}

// 读写文件
const readFile = (path) => {
  const files = fs.readdirSync(path)
  writeFile(files, path)
}
// 增量更新
const updateFile = (filePath, content, files) => {
  const fileStream = []
  try {
    // 读取index.less的内容
    const _file = fs.readFileSync(`${filePath}/${INDEX}`, { encoding: 'utf8' })
    // 截取导入的less
    const lines = _file.split(/\r?\n/)
    lines.forEach(item => {
      if (item.includes('@import')) {
        fileStream.push(item)
      }
    })
  } catch (e) {
    console.log(e)
  }
  const pathStr = new Set()
  files.forEach(item => {
    // 判断文件是否已引入
    const isHasImport = fileStream.find(i => {
      let _itemName = item
      if (_itemName.includes('.less')) {
        _itemName = _itemName.split('.')[0]
      }
      return i.includes(_itemName)
    })
    if (!isHasImport) {
      try {
        const _fileName = item.split('.')
        const stat = fs.lstatSync(`${filePath}/${item}`)
        if (stat.isFile()) {
          (_fileName[1] === 'less' && _fileName[0] !== 'index') && (pathStr.add(`@import './${item}';${os.EOL}`))
        }
        if (stat.isDirectory() && item !== 'theme') {
          pathStr.add(`@import './${item}/index';${os.EOL}`)
        }
      } catch (e) {
        console.log(e)
      }
    }
  })
  const _data = [...pathStr.values()]
  // 写文件
  if (_data.length) {
    try {
      const fileContent = fs.readFileSync(`${filePath}/${INDEX}`, { encoding: 'utf8' })
      fs.writeFileSync(`${filePath}/${INDEX}`, _data.join('') + fileContent)
    } catch (e) {
      console.log(e)
    }
  }
}

readFile('../cip-styles')
