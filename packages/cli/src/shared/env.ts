import { resolve } from 'path';
import fs from 'fs-extra';
import home from 'user-home';


const cwd = process.cwd();
const pkgJson = fs.readJsonSync(resolve(cwd, 'package.json'));

export const version = pkgJson.version;

export {
  home,
  cwd,
}