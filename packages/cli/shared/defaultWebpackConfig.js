const { join } = require('path');
const env = require('./env');

module.exports = {
  entry: {
    'app': join(env.src, 'app.js')
  },
  
  output: {
    filename: `[name].js`,
    globalObject: 'global',
    libraryTarget: 'umd2',
    path: join(env.dist, 'miniprogram_engine')
  },
  
  resolve: {}
}