// pages/components/userInfoDettail/userInfoDetail.js
var utils = require('../../../utils/util.js')
import request from '../../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    access_token: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var result = wx.getStorageSync('access_token').data_content;
    this.setData({
      access_token: result
    })
  },
  /* 
   * 退出登陆
   */
  userLogout: function(e){
    wx.clearStorageSync("access_token")
    wx.navigateBack({
      delta: 1,
    })
  },
  /* 
   * 跳转到修改用户信息页面
   */
  navigateToUpdatePage: function(){
    var user_type = this.data.access_token.user_type
    if (user_type != 1){
      utils.navigateCommonMethod("/pages/components/updateUserInfo/updateUserInfo")
    } else {wx.showToast({title: '仅限手机用户', icon: "none"})
    }
  }
})