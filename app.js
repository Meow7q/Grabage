//app.js
import { Token } from "utils/token.js";
var token = new Token();

App({
  onLaunch: function () {
    token.verify();

    //
    this._getSystemInfo()
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
 
  globalData: {}
  
})