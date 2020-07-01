// pages/discern/discern.js
import { discernModel } from 'discern-model.js';
var discernM = new discernModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPath:'',
    discernRes: {},
    searchRes:{},
    loading_1: true,
    loading_2: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.imgPath = decodeURIComponent(options.path);
    this.setData({
      imgPath: this.data.imgPath
    });
    
    wx.getFileSystemManager().readFile({
      filePath: this.data.imgPath, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => { //成功的回调
        let base64Img = res.data;
        discernM.discern(base64Img, (res)=>{
          let data = res.data;
          //调用百度api错误
          if(data.error_code !== undefined){
            //token不合法
            if (data.error_code == '100' || data.error_code == '110' || data.error_code == '111'){
                wx.showToast({
                  title: '身份过期，重新登陆中...',
                  icon: 'none'
                })
                setTimeout(function(){
                  wx.navigateTo({
                    url: '../index/index?force=true',
                  })
                },2000)
                return true;
            }
              wx.showToast({
                title: data.error_msg,
                icon: 'none'
              })
              return false;
          }

          //识别成功
          this.data.discernRes = res.data.result[0];
          this.data.discernRes.score = Math.floor(this.data.discernRes.score*100);
          this.data.discernRes;
          this.setData({
            discernRes: this.data.discernRes,
            loading_1: false
          });
          this._search(this.data.discernRes.keyword);
        })
      }
    })
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
      path: "/pages/index/index",
      imageUrl: wx.getStorageSync('share_img_url')
    }
  },

  /**
   * 跳转到搜索页面
   */
  _goSearchPage: function(){
    wx.navigateTo({
      url: '../search/search',
    })
  },

  _add: function(){
    wx.navigateTo({
      url: '../add/add?keyword=' + this.data.discernRes.keyword,
    })
  },

  /**
   *搜索 
   */
  _search: function (keyword) {
    this._searchHistoryManager(keyword);
    discernM.search(keyword, (res) => {
      this.data.loading_2 = false;
      if(res.status){
        this.setData({
          loading_2: this.data.loading_2,
          searchRs: res.data
        });
      }
    });
    //加入搜索记录
  },

  /**
   *搜索历史管理 
   */
  _searchHistoryManager: function (searchKeyWord) {
    let histories = wx.getStorageSync('histories') || [];
    //如果搜索关键词存在，则存入搜索历史
      histories.unshift(searchKeyWord);
      wx.setStorageSync('histories', histories);
  },


  /**
   * 到详情介绍页
   */
  _getDetail: function (e) {
    let cat_id = e.currentTarget.dataset.category;
    wx.navigateTo({
      url: '../detail/detail?cat=' + cat_id,
    })
  }
})