import { resolve } from 'path';
import debug from 'debug';
import fs from 'fs-extra';
import home from 'user-home';
import minimist from 'minimist'


const cwd = process.cwd();
const pkgJson = fs.existsSync(resolve(cwd, 'package.json')) ?
  fs.readJsonSync(resolve(cwd, 'package.json')) : {}


debug('env')(`命令执行位置：%s`, cwd);
debug('env')(`项目版本：%s`, pkgJson.version || `无 Tick 项目`);
debug('env')(`项目名称：%s`, pkgJson.name || `无 Tick 项目`);

export const VERSION = pkgJson.version;

export const CWD = cwd;
export const PROJECT_DIR = CWD;
export const HOME = home;

export const TICK_DAEMON_CACHE = `${home}/.tickjs`;
export const TICK_DAEMON_SOCK = `unix://${TICK_DAEMON_CACHE}/tick.sock`;

debug('env')(`Tick 缓存地址：%s`, TICK_DAEMON_CACHE);
debug('env')(`Tick Sock 地址：%s`, TICK_DAEMON_SOCK);

export const TICKRC = '.tickrc.js';
export const TICK_NPM = `https://registry.npmjs.org/@tickjs/cli`;

export const ARGV = minimist(process.argv.slice(2))

