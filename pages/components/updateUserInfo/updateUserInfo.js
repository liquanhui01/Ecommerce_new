import { utils } from '../../../utils/util.js'
import { updatePhoneUser } from "../../api/api"
import request from "../../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    access_token: {},
    userInfo: {},
    err_msg: {},
    err_msg_show: true,
    select_avatar: false
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
   * 选取新的图片
   */
  chooseImage: function(){
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        console.log("选取成功")
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          'userInfo.phone_avatar': tempFilePaths[0],
          select_avatar: true
        })
      }
    })
  },
  /* 
   * 获取用户名
   */
  getUsername: function(e){
    var username = e.detail.value
    this.setData({
      'userInfo.username': username,
      err_msg_show: true
    })
  },
  /* 
   * 获取密码
   */
  getPassword: function(e){
    var password = e.detail.value
    this.setData({
      'userInfo.password': password,
      err_msg_show: true
    })
  },
  /* 
   * 校验并更新用户信息
   */
  updateUser: function(e){
    var username = this.data.userInfo.username
    var password = this.data.userInfo.password
    var password_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,13}$/;
    var id = this.data.access_token.id
    if (username){
      if (username.length < 2 || username.length > 20){
        this.setData({
          'err_msg.username': '用户名格式不正确',
          err_msg_show: false
        })
      }
    }
    if (password){
      if (!password_reg.test(password)){
        this.setData({
          'err_msg.password': '密码格式不正确',
          err_msg_show: false
        })
      }
    }
    console.log(this.data.userInfo.phone_avatar)
    // request._put(updatePhoneUser + id + "/", this.data.userInfo.phone_avater, "", "multipart/form-data").then(res => {
    //   console.log(res)
    // }).catch(error => {
    //   console.log(error)
    // })
    wx.request({
      url: 'http://127.0.0.1:8000/users/update/' + id + "/",
      data: {
        phone_avatar: this.data.userInfo.phone_avatar
      },
      method: 'PUT',
      header: {
        "content_type": "multipart/form-data"
      },
      success: red => {
        console.log(res)
      },
      fial: err => {
        console.log(err)
      } 
    })
  }
})