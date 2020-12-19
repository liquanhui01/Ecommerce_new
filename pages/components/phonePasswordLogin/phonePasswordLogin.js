var utils = require('../../../utils/util.js')
import request from '../../../utils/request.js'
import { userLogin } from '../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      'user_type': 2,
      'type': 'password'
    },
    err_msg: {}
  },
  /* 
   * 获取手机号
   */
  getPhone: function(e){
    this.setData({
      'userInfo.phone': e.detail.value
    })
  },
  /* 
   * 获取密码
   */
  getPassword: function(e){
    this.setData({
      'userInfo.password': e.detail.value
    })
  },
  /* 
   * 登陆账号
   */
  submitUserInfo: function(e){
    let data = this.data.userInfo
    let phone = utils.checkPhoneOrUsername(data.phone)
    let password = utils.checkPassword(data.password)
    let key = "access_token"
    if(phone && password){
      request._post(userLogin, data, '').then(res => {
        if(res.statusCode == 200){
          wx.clearStorageSync(key)
          utils.commonSetStorage(key, res.data, 24*3600*1000)
          request.commonToast("登陆成功", "success")
          wx.switchTab({url: '/pages/my/my'})
        } else if(res.statusCode == 404){
          request.commonToast("用户不存在", "error")
        } else {
          request.commonToast("登陆失败，请重新登陆", "error")
        }
      }).catch(error => {
        request.commonToast("登陆失败，请重新登陆", "error")
      })
    }
  },
  /* 
   * 跳转到手机号验证码登陆页面
   */
  navigateToVerifyCodePage: function(e){
    utils.navigateCommonMethod("/pages/components/phoneLogin/phoneLogin")
  },
  /* 
   * 跳转到手机账号注册页面 
   */
  navigateToSignupPage: function (e) {
    utils.navigateCommonMethod("/pages/components/signup/signup");
  }
})