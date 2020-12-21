const {
  createTemplate,
  createWorker,
  button,
  quotate
} = require('../dist')

function createTemplates () {
  const worker = createWorker(0, [
    ['button', button],
  ]);

  return worker.stringify()
}


console.log(createTemplates())


