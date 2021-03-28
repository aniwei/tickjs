const util = require('./util')
const path = require('path')
const wcsc = require('./build/Release/wcsc.node')

const fs = util.fs

exports = async function (options) {
  if (!options) throw Error('options is required')

  options = Object.assign(
    {
      files: [],
      pageCount: 2,
      cwd: process.cwd,
      replaceContent: {},
      debug: false,
      classPrefix: '',
    },
    options,
  )

  return new Promise((resolve, reject) => {
    Promise.all(
      options.files.map((file) => {
        if (options.replaceContent[file]) {
          return options.replaceContent[file]
        }
        return fs.readFile(path.resolve(options.cwd, file), 'utf8')
      }),
    ).then(async (results) => {
      options.contents = results
      const resultArr = wcsc(options).split('=')
      const result = {}
      for (
        let i = 0, len = resultArr.length;
        i < len && resultArr[i + 1];
        i += 2
      ) {
        result[resultArr[i]] = resultArr[i + 1]
      }

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
        await fs.writeFile(output, JSON.stringify(result, null, 2), 'utf8')
      }

      resolve(result)
    }, reject)
  })
}

Object.defineProperty(exports, 'version', {
  get() {
    return wcsc.version
  },
})

module.exports = exports
