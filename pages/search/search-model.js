import { base } from '../../utils/base.js';

class searchModel extends base {
  constructor() {
    super();
  }

  /**
   * 更新用户信息到数据库
   */
  search(keyword, callBack) {
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

  popularList(callBack){
    var params = {
      'url': 'dictionary/popular_list',
      'method': 'get',
      'callBack': function (res) {
        callBack && callBack(res);
      }
    }
    this._request(params);
  }

}

export { searchModel };