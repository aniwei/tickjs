const fs = require('fs-extra');
const env = require('../../shared/env');
const print = require('../../shared/print');



module.exports = async function init () {
  const exist = await fs.exists(env.rc);
  console.log(1)

  if (exist) {
    
  } else {
    console.log(1)
  }
}