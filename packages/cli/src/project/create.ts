import inquirer from 'inquirer';

async function exists () {
  return true;
}

async function prompt () {
  inquirer.prompt([
    {
      type: ''
    }
  ])
}

export async function create () {
  if (await exists()) {
    return console.log('exists')
  }

}