const withImages = require('next-images')


module.exports = withImages({
  webpack: config => {
    config.resolve.alias['react-native'] = 'react-native-web'
    return config;
  }
})