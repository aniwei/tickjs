import formatter from 'xml-formatter';
import * as fs from 'fs-extra';
import * as env from '../../shared/env';

import {
  createWorkerTemplate
} from './template'

export async function init () {
  const template = createWorkerTemplate();

  const xml = template.stringify();

  await fs.writeFile(
    'tickjs.wxml', 
    formatter(xml, {
      indentation: '  ',
      lineSeparator: '\n'
    })
  )
}