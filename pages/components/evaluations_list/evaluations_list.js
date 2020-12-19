// pages/components/evaluations_list/evaluations_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all_status: true,
    new_status: false,
    picture_status: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /* 
   * 点击改变“全部”状态
   */
  changeAllStatus: function () {
    this.setData({
      all_status: true,
      new_status: false,
      picture_status: false
    });
  },
  /* 
   * 点击改变“最新”状态
   */
  changeNewStatus: function () {
    this.setData({
      all_status: false,
      new_status: true,
      picture_status: false
    });
  },
  /* 
   * 点击改变“有图”状态
   */
  changePictureStatus: function () {
    this.setData({
      all_status: false,
      new_status: false,
      picture_status: true
    });
  }
})