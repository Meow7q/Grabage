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
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
 
  onLoad: function () {
    this.setData({
      showModal: false
    });
    indexM.getBdtoken((res)=>{
    
      if(res.status){
        wx.setStorageSync('bd_token', res.data.bd_token)
      }else{
        wx.showToast({
          title: res.message,
          icon:  'none'
        })
      }
    });
  },
  //事件处理函数
  _takePhoto: function () {
    if (!app.globalData.authStatus) {
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
    if (!app.globalData.authStatus) {
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
    if (!app.globalData.authStatus) {
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
    if (!app.globalData.authStatus) {
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
    if (e.detail.userInfo) {
      app.globalData.authStatus=true;
      indexM.updateUserinfo(e.detail.userInfo);
    }
    //关闭模态框
    this.setData({
      showModal: false
    }); 
  },
})
