import { config } from "config.js";
class Token {
  constructor() {
    this.getTokenUrl = config.requestUrl + 'oauth/token';
    this.verifyTokenUrl = config.requestUrl + 'token';
  }

  verify() {
    var token = wx.getStorageSync('token');
    if (!token) {
      this.getTokenFromServer();
    } 
  }

  /**
   * 从服务器获取新的token
   */
  getTokenFromServer(callBack) {
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          url: that.getTokenUrl,
          method: 'POST',
          data: {
            'code': res.code
          },
          success: function (res) {
            if(res.data.status){
              wx.setStorageSync('share_img_url', res.data.data.share_img_url);
              wx.setStorageSync('token', res.data.data.token);
              callBack && callBack(res.data.data.token);
              return true;
            }
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