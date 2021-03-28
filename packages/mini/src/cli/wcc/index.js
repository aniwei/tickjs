const util = require('./util')
const path = require('path')
const wcc = require('./build/Release/wcc.node')

const fs = util.fs

exports = async function (options) {
  if (!options) throw Error('options is required')

  options = Object.assign(
    {
      files: [],
      contents: [],
      replaceContent: {},
      verbose: false,
      debug: false,
      debugWXS: false,
      showNewTree: false,
      isPlugin: false,
      addTestAttre: false,
      independent: false,
      genfuncname: '$gwx',
      isCut: false,
      cwd: process.cwd,
      debug: false,
    },
    options,
  )

  return new Promise(async (resolve, reject) => {
    let st = Date.now()

    // 获取文件内容
    if (!options.contents.length) {
      const tasks = options.files.map((file) => {
        if (options.replaceContent[file]) {
          return options.replaceContent[file]
        }
        return fs.readFile(path.resolve(options.cwd, file), 'utf8')
      })
      options.contents = await Promise.all(tasks) || []
    }
    // console.log('wcc get files', Date.now() - st, options.contents)
    let result
    try {
      result = wcc(options)
    } catch(e) {
      console.error('wcc error', e)
    }

    console.log('wcc get compile', Date.now() - st)
    if (options.output) {
      const output = path.resolve(options.cwd, options.output)
      const dir = path.dirname(output)
      try {
        await fs.stat(dir)
      } catch (e) {
        await fs.mkdir(dir, {
          recursive: true,
        })
      }
      await fs.writeFile(output, result, 'utf8')
    }
    console.log('wcc get output', Date.now() - st)
    resolve(result)
  })
}

Object.defineProperty(exports, 'version', {
  get() {
    return wcc.version
  },
})

module.exports = exports
