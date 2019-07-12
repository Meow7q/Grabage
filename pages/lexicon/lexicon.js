// pages/lexicon/lexicon.js
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
    listdata:[
      { id: 0, nickname: 'a', headimgurl: '', name: '火车', type: 2, type_info: {id:1,name:'干垃圾'}, agree: 0, against: 2, garbage1: 0, garbage2: 0, garbage3: 0, garbage4: 0, garbage5: 0 },
      { id: 0, nickname: 'a', headimgurl: '', name: '飞机', type: 2, type_info: { id: 1, name: '干垃圾' }, agree: 0, against: 2, garbage1: 0, garbage2: 0, garbage3: 0, garbage4: 0, garbage5: 0 },
      { id: 0, nickname: 'a', headimgurl: '', name: '香蕉皮', type: 1, type_info: { id: 1, name: '湿垃圾/易腐垃圾/厨余垃圾' }, agree: 0, against: 2, garbage1: 0, garbage2: 0, garbage3: 0, garbage4: 0, garbage5: 0 },
      { id: 0, nickname: 'a', headimgurl: '', name: '火箭', type: 2, type_info: { id: 1, name: '干垃圾' }, agree: 0, against: 2, garbage1: 0, garbage2: 0, garbage3: 0, garbage4: 0, garbage5: 0 },
      { id: 0, nickname: 'a', headimgurl: '', name: '鱼骨头', type: 1, type_info: { id: 1, name: '干垃圾' }, agree: 0, against: 2, garbage1: 0, garbage2: 0, garbage3: 0, garbage4: 0, garbage5: 0 },
      { id: 0, nickname: 'a', headimgurl: '', name: '洗面奶', type: 1, type_info: { id: 1, name: '干垃圾' }, agree: 0, against: 2, garbage1: 0, garbage2: 0, garbage3: 0, garbage4: 0, garbage5: 0 },
      { id: 0, nickname: 'a', headimgurl: '', name: '火柴', type: 1, type_info: { id: 1, name: '干垃圾' }, agree: 0, against: 2, garbage1: 0, garbage2: 0, garbage3: 0, garbage4: 0, garbage5: 0 },
      { id: 0, nickname: 'a', headimgurl: '', name: '粉底液', type: 1, type_info: { id: 1, name: '干垃圾' }, agree: 0, against: 2, garbage1: 0, garbage2: 0, garbage3: 0, garbage4: 0, garbage5: 0 },
      { id: 0, nickname: 'a', headimgurl: '', name: '面膜', type: 1, type_info: { id: 1, name: '干垃圾' }, agree: 0, against: 2, garbage1: 0, garbage2: 0, garbage3: 0, garbage4: 0, garbage5: 0 },
      { id: 0, nickname: 'a', headimgurl: '', name: '公交卡', type: 2, type_info: { id: 1, name: '干垃圾' }, agree: 0, against: 2, garbage1: 0, garbage2: 0, garbage3: 0, garbage4: 0, garbage5: 0 },
      { id: 0, nickname: 'a', headimgurl: '', name: '废旧椅子', type: 1, type_info: { id: 1, name: '干垃圾' }, agree: 0, against: 2, garbage1: 0, garbage2: 0, garbage3: 0, garbage4: 0, garbage5: 0 },
      { id: 0, nickname: 'a', headimgurl: '', name: '纸盒子', type: 1, type_info: { id: 1, name: '干垃圾' }, agree: 0, against: 2, garbage1: 0, garbage2: 0, garbage3: 0, garbage4: 0, garbage5: 0 },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      list: this.data.listdata
    });
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
    wx.showToast({
      title: 'more',
      icon: 'none'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "纸巾是干垃圾吗？",
      path: "/pages/index/index"
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

  _showModal: function(e) {
    this.setData({
      modelShow: true
    });
  },
  _hideModal: function(e) {
    this.setData({
      modelShow: false
    });
  },
  //判断或选择
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
    let option = e.currentTarget.dataset.option;
    let index = this.data.index;
    this.data.listdata.splice(index, 1);
    this._hideModal();
    this.setData({
      list: this.data.listdata
    });
    console.log(option);
    console.log(this.data.index);
  }
})