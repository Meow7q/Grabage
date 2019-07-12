// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否搜索了
    haveSearched: false,
    //搜索结果
    searchRs:[],
    //搜索关键词
    searchKeyWord: '',
    //搜索历史记录
    searchHistories: [],
    loading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._initData();
    this._searchHistoryManager();
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

  },

  /** 
   * 装载数据 
   */
  _initData: function(){
    this.setData({
      searchKeyWord: this.data.searchKeyWord,
      haveSearched: this.data.haveSearched,
      searchRs: this.data.searchRs
    });
  },

  /**
   * loading
   */
  _loading: function(loadingStatus){
    this.setData({
      loading: loadingStatus
    });
  },

  /**
   *搜索历史管理 
   */
  _searchHistoryManager: function(){
    let histories = wx.getStorageSync('histories') || [];
    if (this.data.searchKeyWord) {
      histories.unshift(this.data.searchKeyWord);
      wx.setStorageSync('histories', histories);
      this.setData({
        histories: histories
      });
    }else{
      this.setData({
        histories: histories
      });
    }
  },

  //搜索
  _search: function () {
    if(!this.data.searchKeyWord){
      return false;
    }
    this._loading(true);
    var that = this;
    this.setData({
      haveSearched: true
    });
    setTimeout(function(){
      that._loading(false);
      that._searchHistoryManager();
      that.data.haveSearched = true;
      that.data.searchRs = [];
      that._initData();
    },2000);
    //加入搜索记录
  },

  //获取搜索框的值
  _getKeyWrod: function (e) {
    this.data.searchKeyWord = e.detail.value;
    this._initData();
  },

  /**
   * 清除
   */
  _clean: function(e){
    this.data.searchKeyWord = '';
    this.data.haveSearched = false;
    this.data.searchRs = [];
    this._initData();
  }
})