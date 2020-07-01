// pages/lexicon/lexicon.js
import { lexiconModel } from 'lexicon-model.js';
var lexiconM = new lexiconModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    floorstatus: false,
    //当前选中的物品的信息
    info: null,
    //当前所选的物品在数组的index
    index:null,
    current_page: 1,
    total: 0,
    listdata:[],
    getMoreLoading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      getMoreLoading: this.data.getMoreLoading
    });
    this._getQuestionList();
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
   * 页面上拉触底事件的处理函数（上拉加载更多）
   */
  onReachBottom: function () {
    //上拉加载更多
    this.data.current_page++;
    this.data.getMoreLoading = true;
    this.setData({
      getMoreLoading: this.data.getMoreLoading
    });
    this._getQuestionList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let index = this.data.index;
    let q_info = this.data.listdata[index];
    console.log(q_info);
    let title = '【'+q_info.name+'】' + '属于哪一类垃圾?';
    if (q_info.type == 1) {
      title = '【' + q_info.name + '】' + '是' + q_info.category_votes.category_name + '吗?'
    }
    return {
      title: title,
      path: '/pages/answer/answer?q_id=' + q_info.id,
      imageUrl: wx.getStorageSync('share_img_url'),
    }
  },

  onPageScroll: function (e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  _goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  //答题菜单
  _showModal: function(e) {
    this.setData({
      modalShow: true
    });
  },
  _hideModal: function(e) {
    this.setData({
      modalShow: false
    });
  },

  //操作导航菜单
  _showOptModal: function (e) {
    this.setData({
      optModalShow: true
    });
  },
  _hideOptModal: function (e) {
    this.setData({
      optModalShow: false
    });
  },

  
  //弹出操作模态框
  _selectOrJudge: function(e){
    let index = e.currentTarget.dataset.index;
    let info = this.data.listdata[index];
    this.data.index = index;
    this.data.info = info;
    this._showModal();
    this.setData({
      info:info
    });
  },
  
  //选项选择
  _optionSelect: function(e){
    let opt = e.currentTarget.dataset.opt;
    let index = this.data.index;
    let q_id = this.data.listdata[index].id;
    this.data.listdata.splice(index, 1);
    this._hideModal();
    lexiconM.vote(q_id, opt, (res)=>{
      console.log(res);
    });
    this.setData({
      listdata: this.data.listdata
    });

  },

  //获取列表
  _getQuestionList: function(){
    lexiconM.getQuestionList(this.data.current_page, (res)=>{
      if(!res.status){
        wx.showToast({
          title: '网络错误!',
          icon: 'none'
        });
        return false;
      }

      this.data.current_page = res.data.current_page;
      this.data.total = res.data.total;
      this.data.getMoreLoading = this.data.length>20?true:false;
      this.data.listdata.push.apply(this.data.listdata, res.data.data);

      this.setData({
        getMoreLoading: this.data.getMoreLoading,
        listdata: this.data.listdata
      });
    });
  },

  _goAddPage: function(){
      wx.navigateTo({
        url: '/pages/add/add',
      })
  },
  _appreciate: function(){
    wx.previewImage({
      current: 'https://garbage.meow7.cn//upload/img/appreciate.jpg', // 当前显示图片的http链接
      urls: ['https://garbage.meow7.cn//upload/img/appreciate.jpg'] // 需要预览的图片http链接列表
    })
  },

})