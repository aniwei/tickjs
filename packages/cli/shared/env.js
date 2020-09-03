const { resolve } = require('path');
const cwd = process.cwd();

module.exports = {
  cwd: cwd,
  rc: resolve(cwd, '.tickrc.js')
}