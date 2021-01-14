

import { isBrowser, globalDocument } from './shared';

function createDocument () {

}

export const document = (isBrowser ? globalDocument : createDocument())