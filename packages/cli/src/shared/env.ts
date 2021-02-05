import { resolve } from 'path';
import debug from 'debug';
import fs from 'fs-extra';
import home from 'user-home';
import minimist from 'minimist'


const cwd = process.cwd();
const pkgJson = fs.existsSync(resolve(__dirname, '../../package.json')) ?
  fs.readJsonSync(resolve(__dirname, '../../package.json')) : {}

debug('env')(`命令执行位置：%s`, cwd);
debug('env')(`CLI版本：%s`, pkgJson.version);

export const VERSION = pkgJson.version;

export const CWD = cwd;
export const HOME = home;
export const NODE_ENV = process.env.NODE_ENV ?? 'production';
export const PROJ_DIR = CWD;

export const TICK_DAEMON_CACHE = `${home}/.tickjs`;
export const TICK_DAEMON_SOCK = `unix://${TICK_DAEMON_CACHE}/tick.sock`;

debug('env')(`Tick 缓存地址：%s`, TICK_DAEMON_CACHE);
debug('env')(`Tick Sock 地址：%s`, TICK_DAEMON_SOCK);

export const TICKRC = '.tickrc.js';
export const TICK_NPM = `https://registry.npmjs.org/@tickjs/cli`;

export const ARGV = minimist(process.argv.slice(2))



