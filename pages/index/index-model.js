import { base } from '../../utils/base.js';

class indexModel extends base{
  constructor(){
    super();
  }

  /**
   * 更新用户信息到数据库
   */
  updateUserinfo(userinfo){
    console.log(userinfo);
  }

  /**
   * 获取百度token
   */
  getBdtoken(callBack){
    var params = {
      'url': 'bd_token',
      'method': 'POST',
      'callBack': function (res) {
       callBack && callBack(res);
      }
    }
    this._request(params);
  }

  /**
   * 更新用户信息
   */
  updateUserinfo(userinfo, callBack){
    var params = {
      'url': 'user',
      'method': 'POST',
      'data':userinfo, 
      'callBack': function (res) {
        callBack && callBack(res);
      }
    }
    this._request(params);
  }
}

export { indexModel };