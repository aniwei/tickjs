import fs from 'fs-extra';

import { project } from './project'


export async function start () {
  await project.scan()
}

export default start;