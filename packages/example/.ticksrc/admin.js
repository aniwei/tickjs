// ./Admin/Index
import { ViewController } from '@tickjs/weapp';
import AdminIndex from 'AdminIndex';

const controller = new ViewController('/admin', AdminIndex);
controller.register();