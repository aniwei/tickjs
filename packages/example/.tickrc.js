const { resolve } = require('path');

module.exports = {
  appid: 'wx3ce645f632f26623',

  thirdParty: {
    'vant-button': '@vant/weapp/button/dist/index'
  },

  defaultNavigationConfig: {

  },

  window: {
    title: '',
    navigationBarTitleText: ''
  },

  routes: [
    {
      path: '/admin',
      component: './Index',
      config: {
        enablePullDownRefresh: true,
        disableShareMenu: true
      },
      routes: [
        {
          path: '/signin',
          component: './Admin/SignIn'
        }
      ]
    }
  ],

  tabBar: {
    items: [
      {
        path: '/admin',
        selectedIcon: '',
        icon: '',
        text: ''
      }, {
        path: '/admin',
        selectedIcon: '',
        icon: '',
        text: ''
      }
    ]
  },

  alias: {

  }
}