const fs = require('fs-extra');
const { transform } = require('lebab');


const code = transform(fs.readFileSync('wxservice.js').toString(), [
  'let', 'arrow', 'arrow-return'
])

console.log(code);