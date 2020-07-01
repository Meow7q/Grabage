import { base } from '../../utils/base.js';

class answerModel extends base {
  constructor() {
    super();
  }

  //获取所有分类
  getQuestionById(q_id, callBack) {
    var params = {
      'url': 'question/'+q_id,
      'method': 'get',
      'callBack': function (res) {
        callBack && callBack(res);
      }
    }
    this._request(params);
  }

  vote(q_id, opt, callBack) {
    var params = {
      'url': 'question/vote',
      'method': 'post',
      'data': { opt: opt, q_id: q_id },
      'callBack': function (res) {
        callBack && callBack(res);
      }
    }
    this._request(params);
  }


}

export { answerModel };