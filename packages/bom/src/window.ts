
import { EMPTY_OBJ, isBrowser, globalWindow } from './shared'

import { navigator } from './navigator'
import { document } from './document';

export const window = isBrowser ? globalWindow : {
  navigator,
  document
}
