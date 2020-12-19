// pages/index/index.js
var utils = require('../../utils/util.js');
import request from "../../utils/request.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiper: [
    ],
    boutiqueu: [
    ],
    categories: [
    ],
  },
  /* 
   * 初始加载
   */
  onLoad: function(option){
    var result = wx.getStorageSync('access_token').data_content
    if(!result){
      // request.commonToast("请先登陆账户")
      wx.showToast({
        title: '请先登陆账户',
        icon: 'none'
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/my/my',
        })
      }, 2000)
    }
  },
  /*
   * 跳转到搜索商品页面
   */
  navigateToFindPage: function(){
    utils.navigateCommonMethod(
      "/pages/components/find/find"
    );
  }
})
