import fs from 'fs-extra';
import cli from 'cli-color';

import { project } from './project'


export async function start () {
  await project.scan()
}

export default start;