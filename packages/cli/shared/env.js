const { resolve } = require('path');
const home = require('user-home');
const cwd = process.cwd();

module.exports = {
  home,
  cwd: cwd,
  src: resolve(cwd, 'src'),
  dist: resolve(cwd, '.ticksrc'),
  tickrc: resolve(cwd, '.tickrc.js'),
  separator: '_'
}