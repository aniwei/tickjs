import debug from 'debug';
import { CommandResponseStatusCode } from '../../shared/command';

export async function stop (payload, message, commandar, daemon?) {
  debug('STOP')(`已经推出进程`);

  process.nextTick(() => {
    process.exit(1);
  });

  return {
    code: CommandResponseStatusCode.SUCCESS,
    message: 'STOP 命令执行成功'
  }
}