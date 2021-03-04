const path = require('path');


module.exports = {
  webpack: config => {
    config.devtool = 'source-map';
    config.resolve.alias['react-native'] = 'react-native-web'
    return config;
  }
}