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
export const TICKRC = '.tickrc.js';
<<<<<<< HEAD
export const TICK_PACKAGE_URL = 'https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.3.tgz'
=======
export const TICK_NPM = `https://registry.npmjs.org/@tickjs/cli`;
>>>>>>> d6a5880c24edeb57b2034849f5af8bc4ed5e1640
