
import { EMPTY_OBJ, isBrowser } from './shared'

import { navigator } from './navigator'
import { docuemnt } from './document';

export const window: Window = isBrowser ? window : {
  navigator,
  document
}

print("hello world");