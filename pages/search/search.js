// pages/search/search.js
import { searchModel } from 'search-model.js';
var searchM = new searchModel(); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否点击了搜索按钮
    haveSearched: false,
    //是否搜索结束
    havesearchEnd: false,
    //搜索结果
    searchRs: [],
    //热门搜索列表
    popularList: [],
    //搜索关键词
    searchKeyWord: '',
    //搜索历史记录
    histories: [],
    loading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._popularList();
    this._searchHistoryManager();
    this._initData();
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
      havesearchEnd: this.data.havesearchEnd,
      searchRs: this.data.searchRs,
      popularList: this.data.popularList
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
    //如果搜索关键词存在，则存入搜索历史
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
    this.data.haveSearched = true;
    this.data.havesearchEnd = false;
    this.setData({
      havesearchEnd: this.data.havesearchEnd,
      haveSearched: this.data.haveSearched
    });
    this._searchHistoryManager();

    var that = this;
    searchM.search(this.data.searchKeyWord, (res)=>{
      that._loading(false);
      that.data.havesearchEnd = true;
      that.data.searchRs = res.data;
      that._initData();
    });
    //加入搜索记录
  },

  _goSearch: function(e){
    let word = e.currentTarget.dataset.word;
    this.data.searchKeyWord = word;
    this._search();
  },

  /**
   * 热门搜索
   */
  _popularList: function(){
    searchM.popularList((res) => {
        if(res.status){
          this.data.popularList = res.data;
          this.setData({
            popularList: this.data.popularList
          });
          return true;
        }
    });
  },

  //获取搜索框的值
  _getKeyWrod: function (e) {
    this.data.searchKeyWord = e.detail.value;
    this._initData();
  },

  /**
   * 清空搜索框
   */
  _clean: function(e){
    this.data.searchKeyWord = '';
    this.data.haveSearched = false;
    this.data.searchRs = [];
    this.data.havesearchEnd = false;
    this._initData();
  },

  /**
   * 清空搜索历史
   */
  _cleanHistory: function(){
    wx.setStorageSync('histories',[])
    this._searchHistoryManager();
  },

  /**
   * 到详情介绍页
   */
  _getDetail: function(e){
    let cat_id = e.currentTarget.dataset.category;
    wx.navigateTo({
      url: '../detail/detail?cat='+cat_id,
    })
  },

  _add: function () {
    wx.navigateTo({
      url: '../add/add?keyword=' + this.data.searchKeyWord,
    })
  },
})