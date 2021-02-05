

export default {
  thirdParty: {
    'vant-button': {
      src: './node_modules/@vant/dis/button',
      props: [
        { name: 'type', defaultValue: 'default' }, 
        { name: 'size', defaultValue: 'normal'}
      ],
      events: [
        { name: 'click', capture: false }, 
        { name: 'contact', capture: false }
      ]
    }
  }
}