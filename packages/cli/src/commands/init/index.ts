import formatter from 'xml-formatter';
import * as fs from 'fs-extra';
import * as env from '../../shared/env';

import {
  createWorkerTemplate
} from './template'

export async function init () {
  const template = createWorkerTemplate();

  await fs.writeFile(
    'tickjs.wxml', 
    formatter(template.stringify(), {
      indentation: '  ',
      lineSeparator: '\n'
    })
  )
}