//app.js
import { Token } from "utils/token.js";
var token = new Token();

App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    //验证token
    token.verify();

    //
    this._getSystemInfo()
    this._getAuthStatus()
  },
  //获取系统信息
  _getSystemInfo(){
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  //获取是否授权状态
  _getAuthStatus(){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.globalData.authStatus = true;
        }
      }
    })
  },
  globalData: {
    authStatus:false,
    userInfo: null
  }
})