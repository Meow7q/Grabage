import { config } from 'config.js';
import { Token } from 'token.js';
var token = new Token();
class base {
  constructor() {
    this.requestUrl = config.requestUrl;
  }

  _request(params) {
    var that = this;
    params.method = params.method ? params.method : 'GET';
    wx.request({
      url: this.requestUrl + params.url,
      method: params.method,
      data: params.data,
      header: {
        'Accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success: function (res) {
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);
        if (startChar == '2') {
          params.callBack && params.callBack(res.data);
        } else {
          if (code == '401') {
              that._refetch(params);
          } else if (code == '400') {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          } else if (code == '500') {
            wx.showToast({
              title: '网络错误!',
              icon: 'none'
            })
          }
         params.ecallBack && params.ecallBack(res.data);  
        }
      },
      fail: function (error) {
        params.ecallBack && params.ecallBack(error);
      }
    })
  }

  _refetch(params) {
    token.getTokenFromServer((res) => {
      this._request(params);
    });
  }
}

export { base };