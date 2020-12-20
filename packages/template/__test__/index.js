const {
  createTemplate
} = require('../dist/createTemplate')
const {
  createAudio
} = require('../dist/TickTemplateAudioNode')

const {
  createCamera
} = require('../dist/TickTemplateCameraNode')

const {
  createWorker
} = require('../dist/TickTemplateWorker');

const {
  quotate
} = require('../dist/shared');

function createAudioTemplate () {
  const root = createTemplate(quotate('components'));
  const worker = createWorker(quotate('worker'), [
    [quotate('../../components')]
  ]);

  [
    ['audio', createAudio()],
    ['camera', createCamera()],
  ].forEach(([name, node]) => {
    const template = createTemplate(`"${name}"`);
    template.appendChild(node);

    root.appendChild(template);
  });

  return worker.stringify()
}


console.log(createAudioTemplate())


