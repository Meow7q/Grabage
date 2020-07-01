import { base } from '../../utils/base.js';

class lexiconModel extends base {
  constructor() {
    super();
  }

  //获取所有分类
  getQuestionList(page, callBack) {
    var params = {
      'url': 'question',
      'method': 'get',
      'data': {page:page},
      'callBack': function (res) {
        callBack && callBack(res);
      }
    }
    this._request(params);
  }

  vote(q_id, opt, callBack){
    var params = {
      'url': 'question/vote',
      'method': 'post',
      'data': { opt: opt, q_id: q_id},
      'callBack': function (res) {
        callBack && callBack(res);
      }
    }
    this._request(params);
  }

}

export { lexiconModel };