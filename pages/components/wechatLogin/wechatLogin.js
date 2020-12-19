// pages/components/wechatLogin/wechatLogin.js
import request from "../../../utils/request.js"
import utils from "../../../utils/util.js"
import { wechatUserRegister, userLogin } from "../../api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    protocol_show: true,
    select_status: false,
    closeImageStatus: true,
    code: '',
    userInfo: {},
  },
  /* 
   * 显示协议内容
   */
  changeProtocolShow: function(e){
    this.setData({
      protocol_show: !this.data.protocol_show,
      closeImageStatus: false
    })
  },
  /* 
   * 选择协议
   */
  selectProtocol: function(e){
    this.setData({
      select_status: !this.data.select_status,
    })
  },
  /* 
   * 关闭协议
   */
  closeProtocolContent:function(){
    this.setData({
      protocol_show: !this.data.protocol_show,
      closeImageStatus: true
    })
  },
  /* 
   * 向服务端发送请求，创建用户信息
   */
  registerUser:(userInfo) => {
    var wechat_user = {
        "username": userInfo.nickName,
        "open_id": userInfo.open_id,
        "session_key": userInfo.session_key,
        "wechat_avatar": userInfo.avatarUrl,
        "user_type": 1,
      },
      key = "access_token",
      that = this;
    request._post(wechatUserRegister, wechat_user, "").then(res => {
      if(res.statusCode == 201 || res.data.username=="用户已存在" || res.data.open_id=="用户已存在"){
        request._post(userLogin, {"open_id": wechat_user.open_id, "type": "wechat", "username": wechat_user.username, "wechat_avatar": wechat_user.wechat_avatar}, "").then(res => {
          utils.commonSetStorage(key, res.data, 24*3600*1000)
        wx.navigateBack({
          delta: 1,
        })
        }).catch(error => {
          // console.log(error)
        })
      } else {
        console.log("创建失败")
      }
    }).catch(error => {
      console.log(error)
    })
  },
  /* 
   * 拿到到code后发送请求到api获取openid和session_key，并存储在userInfo中
   */
  getOpenidAndSessionKey: function (code) {
    var that = this;
    var url = "https://api.weixin.qq.com/sns/jscode2session?" + "appid=" + utils.AppId + "&secret=" + utils.AppSecret + "&js_code=" + code + "&grant_type=authorization_code",
      url_type = 2;
    request._get(url, {}, "", url_type).then(res => {
      this.setData({
        "userInfo.open_id": res.data.openid,
        "userInfo.session_key": res.data.session_key
      })
      let userInfo = this.data.userInfo
      this.registerUser(userInfo);
    }).catch(error => {
      console.log(error)
    })
  },
  /* 
   * 获取微信用户信息并把用户信息存储到数据库中
   */
  getUserMessage: function (code) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          result: 'ok',
          userInfo: res.userInfo
        });
        that.getOpenidAndSessionKey(code);
      }
    });
  },
  /* 
   * 用户登陆 
   */
  userLogin: function (e) {
    wx.login({
      success: (res) => {
        var code = res.code;
        this.getUserMessage(code);
      },
      fail: (err) => {
        console.log(err);
      }
    });
  },
  /* 
   * 获取权限 
   */
  getPermission: function (e) {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          this.userLogin();
          console.log("授权成功")
        } else {
          console.log("授权失败");
        }
      },
    })
  },
  /* 
   * 获取用户信息
   */
  bindGetUserInfo: function(e) {
    if(this.data.select_status == false){
      wx.showToast({title: '请先阅读用户协议', icon: "none"});
    } else {
      this.getPermission();
    }
  },
})