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
      'callBack': function (res) {
       callBack && callBack(res);
      }
    }
    this._request(params);
  }
}

export { indexModel };