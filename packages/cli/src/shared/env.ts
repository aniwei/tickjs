import { resolve } from 'path';
import fs from 'fs-extra';
import home from 'user-home';
import minimist from 'minimist'


const cwd = process.cwd();
const pkgJson = fs.existsSync(resolve(cwd, 'package.json')) ?
  fs.readJsonSync(resolve(cwd, 'package.json')) : {}

export const VERSION = pkgJson.version;

export const CWD = cwd;
export const PROJECT_DIR = CWD;
export const HOME = home;
export const TICKRC = '.tickrc.js';
export const TICK_NPM = `https://registry.npmjs.org/@tickjs/cli`;

export const ARGV = minimist(process.argv.slice(2))
