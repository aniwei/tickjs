import fs from 'fs-extra';
import {
  resolve
} from 'path';

import { TICKRC, CWD } from '../../shared/env';

export const project = new class {
  async scan () {
    await this.exists();
  }

  async exists () {
    const filename = resolve(CWD, TICKRC);

    console.log(filename)

    return fs.pathExists(filename)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }
}