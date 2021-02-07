import debug from '../vm/debug';
import fs from 'fs-extra';
import home from '../vm/user-home';

export const HOME = home;
export const TICK_VM_CACHE = `${HOME}/.tickvm`;


debug('env')(`TickVM 缓存地址：%s`, TICK_VM_CACHE);
