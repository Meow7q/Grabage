import { base } from '../../utils/base.js';

class discernModel extends base {
  constructor() {
    super();
  }

  discern(base64Img, callBack){
    let bd_token = wx.getStorageSync('bd_token');
    let url = 'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general?access_token='+bd_token;
    wx.request({
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      url: url,
      method: 'POST',
      data: { 'image': base64Img, 'baike_num': 1},
      success: function(res){
        callBack(res);
      }
    })
  }


  /**
   * token过期，获取新的token
   */
  reFetchBdtoken(callBack) {
    var params = {
      'url': 'bd_token',
      'callBack': function (res) {
        callBack && callBack(res);
      }
    }
    this._request(params);
  }

  /**
   *搜索 
   */
  search(keyword, callBack){
    var params = {
      'url': 'dictionary',
      'data': { keyword: keyword },
      'method': 'get',
      'callBack': function (res) {
        callBack && callBack(res);
      }
    }
    this._request(params);
  }

}

export { discernModel };