import { config } from "config.js";
class Token {
  constructor() {
    this.getTokenUrl = config.requestUrl + 'oauth/token';
    this.verifyTokenUrl = config.requestUrl + 'token';
  }

  verify() {
    console.log('test');
    var token = wx.getStorageSync('token');
    if (!token) {
      this.getTokenFromServer();
    } else {
      this.verifyTokenByServer(token);
    }
  }

  /**
   * 从服务器获取新的token
   */
  getTokenFromServer(callBack) {
    var that = this;
    wx.login({
      success: function (res) {
        console.log(res.code);
        wx.request({
          url: that.getTokenUrl,
          method: 'POST',
          data: {
            'code': res.code
          },
          success: function (res) {
            wx.setStorageSync('token', res.data.token);
            callBack && callBack(res.data.token);
          }
        })
      }
    })
  }

  /**
   * 验证token是否合法
   */
  verifyTokenByServer(token) {
    var that = this;
    wx.request({
      url: that.verifyTokenUrl,
      method: 'get',
      header: {
        'Authorization': 'Bearer '+token
      },
      success: function (res) {
        var valid = res.data.isValid;
        if (!valid) {
          that.getTokenFromServer();
        }
      }
    })
  }
}

export { Token };