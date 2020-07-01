// pages/answer/answer.js
import { answerModel } from 'answer-model.js';
var answerM = new answerModel(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    q_id: '',
    q_info: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let q_id = options.q_id;
    this.data.q_id = q_id;
    this._getQuestion(q_id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let title = '【'+this.data.q_info.name+'】' + '属于哪一类垃圾?';
    if (type == 1) {
      title = '【' + this.data.q_info.name + '】' + '是' + this.data.q_info.category_votes.category_name + '吗?'
    }
    return{
      title: title,
      path: '/pages/answer/answer?q_id='+this.data.q_id,
      imageUrl: wx.getStorageSync('share_img_url'),
    }
  },

  _radioSelect: function (e) {
    let index = e.currentTarget.dataset.index;
    this.data.index = index;
    this.setData({
      radio: index
    });
  },

  _getQuestion(q_id){
    answerM.getQuestionById(q_id, (res)=>{
      if(!res.status){
        wx.showToast({
          title: res.message,
          icno: 'none'
        });
        setTimeout(function(){
          wx.navigateTo({
            url: '/pages/index/index',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        },1500);
      }
      this.data.q_info = res.data;
      this.setData({
        q_info: this.data.q_info
      });
    })
  },

  formSubmit: function(e){
    this.data.loadding = true;
    this.setData({
      loadding: this.data.loadding
    });
    console.log(e.detail);
    let opt = e.detail.value.opt;
   
    if(opt == undefined){
      return wx.showToast({
        title: '请选择!',
        icon: 'none'
      })
    }

    answerM.vote(this.data.q_id, opt, (res) => {
      this.data.loadding = false;
      this.setData({
        loadding: this.data.loadding
      });

      wx.showToast({
        title: '提交成功!',
        icon: 'none'
      })
    });

  }
})