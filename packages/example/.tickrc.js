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
      path: '/',
      component: './layouts/BasicLayout',
      routes: [
        {
          path: '/admin',
          component: './Admin/Index',
          prerender: './Admin/SignIn/Sketon',
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
      ]
    },
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
    '@tickjs/weapp': resolve('../weapp')
  }
}