// pages/components/numberLogin/numberLogin.js
var utils = require('../../../utils/util.js');
import { getVerifyCode, userLogin } from "../../api/api.js"
import request from "../../../utils/request.js"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    send_code: false,
    time: 60,
    timeData: {},
    time_status: true,
    err_msg: {},
    userInfo: {}
  },
  /* 
   * 获取手机号 
   */
  getPhone: function(e){
    let phone = e.detail.value
    this.setData({
      "userInfo.phone": phone,
      "err_msg.phone": ""
    })
  },
  /* 
   * 点击发送验证码
   */
  sendVerifyCode: function(e){
    var that = this
    var phone = utils.checkPhone(this.data.userInfo.phone)
    if(phone){
      request._post(getVerifyCode, {"phone": phone, "request_type": "login"}, "").then(res => {
        console.log(res)
        if(res.statusCode != 201){
          that.setData({
            "err_msg.phone": res.data.phone[0] || "",
          })
        } else {
          request.commonToast(res.data.phone[0], "success")
          that.setData({
            send_code: true,
            time: 60,
          })
        }
      }).catch(error => {
        request.commonToast(err.data.phone[0], "error")
      })
    }
    console.log(this.data.err_msg)
  },
  /* 
   * 获取验证码
   */
  getVerifyCode: function(e){
    var code = e.detail.value
    this.setData({
      "userInfo.code": code
    })
  },
  /* 
   * 倒计时结束后改变验证状态
   */
  changeVerifyStatus: function(e){
    this.setData({
      send_code: false
    })
  },
  /*
   * 跳转到密码登陆页面
   */
  navigateToPasswordLoginPage: function(e){
    utils.navigateCommonMethod("/pages/components/phonePasswordLogin/phonePasswordLogin")
  },
  /* 
   * 跳转到手机账号注册页面 
   */
  navigateToSignupPage: function (e) {
    utils.navigateCommonMethod("/pages/components/signup/signup");
  },
  /* 
   * 登陆
   */
  submitUserInfo: function(e){
    let key = 'access_token'
    let data = this.data.userInfo
    data['type'] = 'code'
    data['user_type'] = 2
    utils.checkVerifyCode(this.data.userInfo.code)
    request._post(userLogin, data, "").then(res => {
      console.log(res)
      wx.clearStorageSync(key)
      if(res.statusCode == 200){
        utils.commonSetStorage(key, res.data, 24*3600*1000)
        request.commonToast("登陆成功", "success")
        wx.switchTab({url: '/pages/my/my'})
      } else {
        request.commonToast(res.data.phone, "error")
      }
    }).catch(error => {
      // console.log(error)
      request.commonToast("登陆失败，请重新登陆", "error")
    })
  },
  onUnload: function () {
    wx.reLaunch({
      url: '/pages/components/my/my'
    })
  },
})