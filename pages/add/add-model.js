import { base } from '../../utils/base.js';

class addModel extends base {
  constructor() {
    super();
  }

  //获取所有分类
  getAllCategory(callBack){
    var params = {
      'url': 'category',
      'method': 'get',
      'callBack': function (res) {
        callBack && callBack(res);
      }
    }
    this._request(params);
  }

  //添加到词库
  addToDictionary(data, callBack){
    var params = {
      'url': 'question',
      'data': data,
      'method': 'post',
      'callBack': function (res) {
        callBack && callBack(res);
      }
    }
    this._request(params);
  }



}

export { addModel };