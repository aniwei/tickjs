import fs from 'fs-extra';
import chalk from 'chalk';
import inquirer from 'inquirer';
import {
  resolve,
  parse
} from 'path';

import { TICKRC, CWD } from './env';

export const project = new class {
  async forUpdate () {
    
  }

  resolve (path) {
    return resolve(CWD, path);
  }

  exists () {
    return fs.existsSync(this.resolve(TICKRC))
  }

  async create () {
    const prompt = inquirer.createPromptModule();
    const { name } = parse(CWD);

    const yes = await prompt({
      type: 'confirm',
      name: 'yes',
      message: `是否在当前目录 [${CWD}] 创建项目 [${name}]`,
    })
  }
}