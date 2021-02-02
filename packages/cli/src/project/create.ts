import { resolve } from 'path';
import mem from 'mem-fs';
import editor from 'mem-fs-editor';


const store = mem.create();
const fs = editor.create(store);

const PROJ_TPL = resolve(__dirname, '--project--');

export function create (dest, context) {
  return new Promise((resolve) => {
    fs.copyTpl(PROJ_TPL, dest, context);
    fs.commit(resolve);
  });
}