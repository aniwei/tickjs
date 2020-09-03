const fs = require('fs-extra');
const env = require('../../shared/env');

module.exports = async function start () {
  const exist = await fs.exists(env.rc);

  if (exist) {
    const rc = require(env.rc);
  }
  
}