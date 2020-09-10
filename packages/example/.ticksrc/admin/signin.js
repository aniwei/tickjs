// ./Admin/SignIn
import { ViewController } from '@tickjs/weapp';
import AdminSignIn from 'AdminSignIn';

const controller = new ViewController('/admin/signin', AdminSignIn);
controller.register();