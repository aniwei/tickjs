import { resolve } from 'path';
import fs from 'fs-extra';
import home from 'user-home';


const cwd = process.cwd();
const pkgJson = fs.existsSync(resolve(cwd, 'package.json')) ?
  fs.readJsonSync(resolve(cwd, 'package.json')) : {}

export const VERSION = pkgJson.version;

export const CWD = cwd;
export const PROJECT_DIR = CWD;
export const HOME = home;

export const TICK_RC = '.tickrc.js';
export const TICK_DIST = '.tickjs';

export const TICK_SRC = 'src';

export const TICK_NPM = `https://registry.npmjs.org/@tickjs/cli`;