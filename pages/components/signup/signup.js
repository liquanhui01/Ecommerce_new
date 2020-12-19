// pages/components/signup/signup.js
var utils = require("../../../utils/util.js");
import request from "../../../utils/request.js";
import {getVerifyCode, phoneUserRegister} from "../../api/api.js";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    verify_status: false,
    view_status: false,
    err_msg:{},
    time: 61,
    timeData: {},
    time_status: false
  },
  onChange(e) {
    this.setData({
      timeData: e.detail,
    });
  },
  /* 
   * 修改验证的状态，并发送验证请求
   */
  verifybutton: function(e){
    var phone = this.data.userInfo.phone
    this.setData({
      verify_status: true
    });
    request._post(getVerifyCode, {"phone": phone, "request_type": ""}, "").then(res => {
      console.log(res)
      if(res.statusCode === 201){
        request.commonToast(res.data.phone[0], "success")
        this.setData({
          time_status: true,
          time: 60,
          verify_status: false
        })
      } else {
        request.commonToast(res.data.phone[0], "error")
      }
    }).catch(err => {
      request.commonToast(err.data.phone[0], "error")
    })
  },
  /* 
   * 获取用户名内容
   */
  getUsername: function (e) {
    this.setData({
      'userInfo.username': e.detail.value,
      'userInfo.user_type': 2,
      "err_msg.username": ""
    });
  },
  /* 
   * 获取密码的内容
   */
  getPassword: function (e) {
    this.setData({
      'userInfo.password': e.detail.value,
      "err_msg.password": ""
    });
  },
  /* 
   * 获取验证码
   */
  getVerifyCode:function(e){
    this.setData({
      'userInfo.code': e.detail.value,
      "err_msg.code": ""
    });
  },
  /* 
   * 获取手机号
   */
  getPhone: function (e) {
    var phone = e.detail.value
    if(phone.length == 0){
      this.setData({
        view_status: false,
        verify_status: false,
        "err_msg.phone": ""
      });
    } else {
      this.setData({
        'userInfo.phone': phone,
        view_status: true,
        "err_msg.phone": ""
      });
    }
  },
  /* 
   * 提交注册信息，进行注册
   */
  submitUserInfo: function () {
    var userInfo = this.data.userInfo;
    var username = utils.checkUsername(userInfo.username);
    var password = utils.checkPassword(userInfo.password);
    var phone = utils.checkPhone(userInfo.phone);
    var code = utils.checkVerifyCode(userInfo.code);
    if(username && password && phone && code){
      request._post(phoneUserRegister, userInfo, "").then(res => {
        console.log(res)
        if(res.statusCode != 200 && res.statusCode != 201){
          this.setData({
            "err_msg.phone": res.data.phone || "",
            "err_msg.code": res.data.code || "",
            "err_msg.username": res.data.username || "",
            "err_msg.password": res.data.password || ""
          })
        } else {
          request.commonToast("注册成功", "success")
          this.setData({
            userInfo: {},
            time: 60,
            time_status: false,
            err_msg: {},
            view_status: false
          })
          this.onShow()
          utils.navigateCommonMethod("/pages/components/phoneLogin/phoneLogin")
        }
      }).catch(err => {console.log(err)})
    }
  }
})