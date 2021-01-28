import path from 'path';

import { 
  PROJECT_DIR,
  TICK_DIST,
  TICK_RC,
  TICK_SRC
} from '../shared/env';


export function resolve (pathname) {
  return path.resolve(projectDir(), pathname);
}

export function projectDir () {
  return PROJECT_DIR;
}

export function projectDist () {
  return resolve(TICK_DIST)
}

export function projectRCFile () {
  return resolve(TICK_RC)
}

export function projectSRC () {
  return resolve(TICK_SRC)
}