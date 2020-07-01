// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 4,
    isScroll: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.TabCur = options.cat;
    this.setData({
      TabCur: this.data.TabCur
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "一拍即查免烦恼，从我做起爱环保",
      path: "/pages/index/index"
    }
  },

  onPageScroll: function (e) {
    if (e.scrollTop > 150) {
      this.setData({
        isScroll: true
      });
    } else {
      this.setData({
        isScroll: false
      });
    }
  },  

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

})