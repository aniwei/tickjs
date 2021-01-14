export const EMPTY_OBJ = {}

export const isBrowser = typeof document !== 'undefined' && !!document.scripts

export const globalWindow = isBrowser ? window : {};
export const globalDocument = isBrowser ? document : {};