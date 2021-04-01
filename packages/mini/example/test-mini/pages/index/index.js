// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    buttons: 1,
    canIUse: true,
  },
  
  onCreate (e) {
    this.setData({
      buttons: ++this.data.buttons
    })
  }
})
