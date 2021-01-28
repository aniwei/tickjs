import fs from 'fs-extra';
import chalk from 'chalk';
import inquirer from 'inquirer';
import {
  exists
} from './exists';

async function prompt () {
  inquirer.prompt([
    {
      type: ''
    }
  ])
}

export async function create () {
  if (await exists()) {
    return console.log('exists')
  }

  const { yes } = await inquirer.prompt([
    {
      type: 'confirm',
      message: `是否在当前目录创建 ${chalk.green(`「Tick」`)}项目?`,
      name: 'yes'
    }
  ]);

  if (yes) {

  }
}