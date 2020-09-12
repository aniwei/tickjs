const { resolve } = require('path');
const fs = require('fs-extra');
const home = require('user-home');
const cwd = process.cwd();

const pkgJson = fs.readJsonSync(resolve(cwd, 'package.json'));

module.exports = {
  home,
  cwd: cwd,
  src: resolve(cwd, 'src'),
  dist: resolve(cwd, '.ticksrc'),
  tickrc: resolve(cwd, '.tickrc.js'),
  version: pkgJson.version,
  separator: '_'
}