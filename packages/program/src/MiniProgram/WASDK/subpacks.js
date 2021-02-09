__wxRoute = 'subpacks/UsuallyModule/Invite/InviteDetail';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'subpacks/UsuallyModule/Invite/InviteDetail.js';
define("subpacks/UsuallyModule/Invite/InviteDetail.js", function (require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
  "use strict";
  var e = require("../../../service/network.service"),
    t = require("../../../service/login.service");

  Page({
    data: {
      shareDetail: null,
      type: 0,
      isLogin: !1,
      shareInfo: {},
      options: {},
      receiveSuccess: !0,
      userInfo: null,
      isShowShareBtn: !1
    },
    onLoad: function (t) {
      console.log(t), t && (this.data.options = t, this.setTitle(t), t.shareCode && e.atourPoint({
        elementId: 184,
        actionType: "PV_UV"
      }));
      wx.hideShareMenu()
    },
    setTitle: function (e) {
      var t = e.type;
      this.setData({
        type: t
      }), wx.setNavigationBarTitle({
        title: 1 == t ? "邀好友，赚返利" : "亚朵新人礼包"
      })
    },
    getLoginStatus: function () {
      var e = t.isLogin();
      this.setData({
        isLogin: e
      }), e ? (1 != this.data.type && this.getShareInfo(), this.receiveRequest()) : this.getShareDetail()
    },
    getShareDetail: function () {
      var t = this,
        o = this.data.options,
        n = o.shareCode,
        a = o.type;
      debugger;
      e.atourRequest("GET", "fission/".concat(1 == a ? "lucky" : "invitation", "/shareDetail"), {
        shareCode: n
      }).then(function (e) {
        debugger;
        var o = e.data;
        0 == o.retcode ? t.initData(o.result) : 10015 == o.retcode ? t.clearToken() : t.hideShare()
      }).catch(function (e) {
        console.log("err", e), t.hideShare()
      })
    },
    hideShare: function () {
      1 == this.data.type && (wx.hideShareMenu(), this.setData({
        isShowShareBtn: !1
      }))
    },
    clearToken: function () {
      wx.removeStorageSync("token"), this.verLogin()
    },
    initData: function (e) {
      console.log(e), this.setData({
        receiveSuccess: 0 === e.canReceive,
        shareDetail: e,
        userInfo: e && e.receiveInfo && e.receiveInfo.userInfo || e.shareUser
      }), 1 == this.data.type && (wx.showShareMenu(), this.setData({
        shareInfo: e.shareInfo || {},
        isShowShareBtn: !0
      }))
    },
    receive: function () {
      this.data.isLogin || this.verLogin()
    },
    receiveRequest: function () {
      var t = this,
        o = this.data.options,
        n = o.shareCode,
        a = o.type,
        i = getApp().globalData.sourceScene,
        s = {
          shareCode: n
        };
      1 != a && (s.scene = i), e.atourRequest("POST", "fission/".concat(1 == a ? "lucky" : "invitation", "/receive"), s).then(function (e) {
        var o = e.data;
        0 == o.retcode ? t.initData(o.result) : 180005 == o.retcode ? wx.redirectTo({
          url: "/subpacks/UsuallyModule/Invite/Invite?type=1"
        }) : 10015 == o.retcode && t.clearToken()
      }).catch(function (e) {
        console.log("err", e)
      })
    },
    verLogin: function () {
      t.getUserBindingInfo().then(function (e) {
        getApp().globalData.activitySource = "yhlb", e ? wx.navigateTo({
          url: "/pages/Login/Login"
        }) : wx.navigateTo({
          url: "/pages/Login/authorize"
        })
      }, function (e) {
        console.log(e), getApp().globalData.activitySource = "yhlb", wx.navigateTo({
          url: "/pages/Login/authorize"
        })
      })
    },
    goToIndex: function () {
      this.data.options.shareCode && e.atourPoint({
        elementId: 340,
        actionType: "CLICK_EVENT"
      }), wx.switchTab({
        url: "/pages/index/index"
      })
    },
    onReady: function () {},
    onShow: function () {
      this.getLoginStatus()
    },
    onHide: function () {
      this.setData({
        shareDetail: null,
        userInfo: null
      })
    },
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    getShareInfo: function () {
      var t = this;
      debugger;
      e.atourRequest("POST", "fission/invitation/createShare").then(function (e) {
        
        var o = e.data;
        0 == o.retcode ? (t.setData({
          shareInfo: o.result,
          isShowShareBtn: !0
        }), wx.showShareMenu()) : 10015 == o.retcode ? t.clearToken() : t.hideShare()
      }).catch(function (e) {
        console.log("err", e), t.hideShare()
      })
    },
    inviteTwice: function () {
      var e = this;
      wx.showModal({
        title: "",
        content: "哎呀！朵儿发现网络不给力，请您稍后再试试看啦～",
        showCancel: !1
      }), setTimeout(function () {
        1 != e.data.type && e.getShareInfo()
      }, 500)
    },
    onShareAppMessage: function () {
      var t = this.data,
        o = t.shareInfo,
        n = t.type,
        a = t.options,
        i = getApp().globalData,
        s = i.sourceScene,
        r = i.miniAppScene,
        c = wx.getStorageSync("LoginInfo");
      return a.shareCode && e.atourPoint({
        elementId: 341,
        actionType: "CLICK_EVENT"
      }), e.atourRequest("POST", "activity/report/commonReport", {
        reportCode: "SHARE",
        scene: s,
        uid: c && c.mebId || 0,
        miniAppScene: r
      }, void 0, !1, !0), {
        title: o.shareTitle,
        imageUrl: o.shareImage,
        path: "/subpacks/UsuallyModule/Invite/InviteDetail?shareCode=".concat(o.shareCode, "&type=").concat(n, "&scene=").concat(s),
        success: function () {
          wx.showToast({
            title: "已发送"
          })
        }
      }
    }
  });
});
require("subpacks/UsuallyModule/Invite/InviteDetail.js")