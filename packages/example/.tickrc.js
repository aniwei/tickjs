const { resolve } = require('path');

module.exports = {

  thirdParty: {
    'vant-button': '@vant/weapp/button/dist/index'
  },

  window: {
    title: '',
    navigationBarTitleText: ''
  },

  routes: [
    {
      path: '/admin',
      component: './Index',
      routes: [
        
      ]
    }
  ],

  tabBar: {
    items: [

    ]
  },

  alias: {

  }
}