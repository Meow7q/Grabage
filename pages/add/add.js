// pages/add/add.js
import { addModel } from 'add-model.js';
var addM = new addModel(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadding: false,
    keyword: '',
    categories: [],
    //
    index: null,
    showApplyBtn: false,
    //提交成功后返回的当前question的id
    q_id: null,
    //分享的标题
    sharetitle: '',
    shareImgUrl: '',
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let keyword = options.keyword;
    this.data.keyword = keyword;
    this.setData({
      showApplyBtn: this.data.showApplyBtn,
      loadding: this.data.loadding,
      name: keyword?keyword:''
    });

    this._getAllCategory();
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
      return{
        title: this.data.sharetitle,
        path: '/pages/answer/answer?q_id='+this.data.q_id,
        imageUrl: wx.getStorageSync('share_img_url'),
      }
  },

  _radioSelect: function(e){
    let index = e.currentTarget.dataset.index;
    this.data.index = index;
    this.setData({
      radio: index
    });
  },

  _getAllCategory: function(){
    addM.getAllCategory((res)=>{
      if(!res.status){
        wx.showToast({
          title: '网络错误！',
          icon: 'none'
        });
        return false;
      }

      this.data.categories = res.data;
      this.setData({
        categories: this.data.categories
      });

    });
  },

  formSubmit: function(e){
    this.data.loadding = true;
    this.showApplyBtn = false;
    this.setData({
      showApplyBtn: this.data.showApplyBtn,
      loadding: this.data.loadding
    });

    let type = 1;
    let data = e.detail.value;
    let name = data.name;
    let category_id = data.category_id;
    if(!name){
      wx.showToast({
        title: '垃圾名称未填写！',
        icon: 'none'
      });
      this.data.loadding = false;
      this.setData({
        loadding: this.data.loadding
      });
      return false;
    }
    if (!category_id) {
      wx.showToast({
        title: '分类未选择！',
        icon: 'none'
      });
      this.data.loadding = false;
      this.setData({
        loadding: this.data.loadding
      });
      return false;
    }
    //如果选择了不知道，则type=2
    if(category_id == -1){
       type = 2;
    }
    let form_data = {name:name,category_id:category_id,type:type};
    //拼接分享标题
    this.data.sharetitle = '【' + name + '】' + '属于哪一类垃圾?';
    if (type == 1) {
      this.data.sharetitle = '【' + name + '】' + '是' + this.data.categories[this.data.index].category_name+'吗?'
    }
    
    addM.addToDictionary(form_data, (res)=>{
      this.data.loadding =  false;
      this.setData({
        loadding: this.data.loadding
      });
      if(!res.status){
        wx.showToast({
          'title': res.message,
          'icon': 'none'
        });
        return false;
      }
      wx.showToast({
        'title': res.data.message,
        'icon': 'none'
      });
      this.data.q_id = res.data.q_id;
      this.data.shareImgUrl = res.data.shareImgUrl;
      this.data.showApplyBtn = true;
      this.setData({
        showApplyBtn: this.data.showApplyBtn
      });
    });

  }
})