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
          if(data.error_code !== undefined){
            if (data.error_code == '100' || data.error_code == '110' || data.error_code == '111'){
                
                return true;
            }
              wx.showToast({
                title: data.error_msg,
                icon: 'none'
              })
              return false;
          }

          //识别成功
          this.data.discernRes = res.data.result[0]
          this.setData({
            discernRes: this.data.discernRes,
            loading_1: false
          })
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

  }
})