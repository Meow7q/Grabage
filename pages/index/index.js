//index.js
import { indexModel } from 'index-model.js';
var indexM = new indexModel();
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    showModal: false,
    authStatus: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
 
  onLoad: function (options) {
    //此参数来自于discern界面
    let force = options.force?true:false;
    this._bdTokenVerify(force);
    this._getAuthStatus();

    this.setData({
      showModal: false
    });
  
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

  //获取是否授权状态(不能当app.js,因为这个是异步的，导致值可能不一致)
  _getAuthStatus() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.data.authStatus = true;
        }
      }
    })
  },

  /**
   * 百度token验证
   * force表示强制刷新bd_token
   */
  _bdTokenVerify: function(force){
    if (force || !wx.getStorageSync('bd_token')){
      this._getBdToken();
    }
  },


  /**
   * 获取百度token
   */
  _getBdToken: function(){
    indexM.getBdtoken((res) => {
      if (res.status) {
        wx.setStorageSync('bd_token', res.data.bd_token)
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    });
  },

  //事件处理函数
  _takePhoto: function () {
    if (!this.data.authStatus) {
      this.setData({
        showModal: true
      });
      return false;
    }

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        if (res.tempFiles[0].size > 4000000){
          wx.showToast({
            title: '图片不能大于4M!',
            icon: 'none'
          })
          return false;
        }
        wx.navigateTo({
          url: '../discern/discern?path=' + encodeURIComponent(tempFilePaths[0]),
        })
      }
    })
  },
  
  //打开相册
  _openAlbum: function(){
    if (!this.data.authStatus) {
      this.setData({
        showModal: true
      });
      return false;
    }

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        if (res.tempFiles[0].size > 4000000) {
          wx.showToast({
            title: '图片不能大于4M!',
            icon: 'none'
          })
          return false;
        }
        wx.navigateTo({
          url: '../discern/discern?path=' + encodeURIComponent(tempFilePaths[0]),
        })
      }
    })
  },

  /**
   * 跳转到搜索页面
   */
  _search: function(){
    if (!this.data.authStatus) {
      this.setData({
        showModal: true
      });
      return false;
    }

    wx.navigateTo({
      url: '../search/search',
    })
  },

  /**
   * 跳转到词库
   */
  _lexicon: function(){
    if (!this.data.authStatus) {
      this.setData({
        showModal: true
      });
      return false;
    }

    wx.navigateTo({
      url: '../lexicon/lexicon',
    })
  },

  //open-type获取用户授权，方便日后使用scope.userInfo获取用户信息
  _bindgetuserinfo: function(e){
    //关闭模态框
    this.setData({
      showModal: false
    }); 
    //如果成功授权则更新到数据库且更改授权状态
    if (e.detail.userInfo) {
      this.data.authStatus=true;
      indexM.updateUserinfo(e.detail.userInfo);
    }
  },
  
})
