import ora from 'ora';
import { EventEmitter } from 'events';
import { Command, Commands, CommandSpinnerState } from './command';

export class Spinner extends EventEmitter {
  public commandar: Command | null = null;
  public spins: Map<string, any> = new Map();

  constructor (commandar) {
    super();

    this.commandar = commandar;

    this.commandar?.command(Commands.SPIN, async (spin) => {
      let spinner;
      
      if (this.spins.has(spin.id)) {
        spinner = this.spins.get(spin.id);
      } else {
        spinner = ora(spin.id).start();
        this.spins.set(spin.id, spinner);
      }

      switch (spin.state) {
        case CommandSpinnerState.READY: {
          spinner.start(spin.text);
          break;
        }

        default: {
          if (spin.state === CommandSpinnerState.DONE) {
            spinner.succeed(spin.text);
          } else if (spin.state === CommandSpinnerState.FAIL) {
            spinner.fail(spin.text + `(${spin.description})`);
          }
          break;
        }
      }
    })
  }
}