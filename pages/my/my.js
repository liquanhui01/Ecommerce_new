// pages/my/my.js
const {
  commonSetStorage
} = require('../../utils/util.js');
var utils = require('../../utils/util.js')
import request from "../../utils/request.js"
import {
  wechatUserRegister,
  userLogin
} from "../api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    userInfo: {},
    result: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    avatar: "/images/tabs/default_avatar.png",
    access_token: {},
    dialog_show: false,
    userInfo_show: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /* 
   * 跳转到微信登陆页面
   */
  navigateToLoginPage: function(e){
    utils.navigateCommonMethod("/pages/components/wechatLogin/wechatLogin")
  },
  /* 
   * 跳转到用户信息及退出登陆页面
   */
  navigateToUserInfoPage: function(e){
    utils.navigateCommonMethod("/pages/components/userInfoDettail/userInfoDetail")
  },
  /*
   * 手机号登陆
   */
  numberLogin: function () {
    this.setData({
      dialog_show: true
    })
  },
  /* 
   * 跳转到手机验证码登陆页面
   */
  navigateToPhoneLogin: function(e){
    wx.clearStorageSync("access_token")
    utils.navigateCommonMethod("/pages/components/phoneLogin/phoneLogin")
  },
  /*
   * 跳转订单页面的方法模版
   */
  commonOrderMethod: function (index) {
    wx.navigateTo({
      url: '/pages/components/orderList/orderList' + '?index=' + index,
      success: function (res) {
        console.log(res);
      }
    })
  },
  /*
   * 跳转到订单详情页面
   */
  orderList: function () {
    this.commonOrderMethod('0');
  },
  /*
   * 跳转到待付款页面
   */
  willPay: function () {
    this.commonOrderMethod('1');
  },
  /*
   * 跳转到待收货页面
   */
  shipped: function () {
    this.commonOrderMethod('2');
  },
  /*
   * 跳转到已收货页面
   */
  received: function () {
    this.commonOrderMethod('3')
  },
  /*
   * 跳转到收货地址页面
   */
  addressPage: function () {
    utils.navigateCommonMethod('/pages/components/address/address');
  },
  /*
   * 跳转到积分中心页面
   */
  integralPage: function () {
    utils.navigateCommonMethod('/pages/components/integral/integral');
  },
  onShow: function(){
    var result = wx.getStorageSync('access_token').data_content
    if (!result) {
      this.setData({
        userInfo_show: false
      })
    } else if(result.refresh && result.access_token) {
      this.setData({
        access_token: result,
        userInfo_show: true
      });
    }
  }
})