import { resolve } from 'path';
import fs from 'fs-extra';
import home from 'user-home';


const cwd = process.cwd();
const pkgJson = fs.existsSync(resolve(cwd, 'package.json')) ?
  fs.readJsonSync(resolve(cwd, 'package.json')) : {}

export const VERSION = pkgJson.version;

export const CWD = cwd;
export const PROJECT_DIR = CWD;
export const TICKRC = '.tickrc.js';
export const HOME = home;