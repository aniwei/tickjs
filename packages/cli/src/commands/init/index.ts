import chalk from 'chalk';

import { project } from '../../shared/project';

export async function init () {
  if (project.exists()) {
    console.log(chalk.red(`初始化失败，当前目录已经存在 ${chalk.bgRed('Tick')} 项目`))
  } else {
    project.create();
  }
}