// pages/components/templates/addressForm/addForm.js
var utils = require("../../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: false,
    region: [],
    addressInfo: {},
  },
  onLoad: function (options) {
    var address = JSON.parse(options.address);
    var region = this.data.region;
    region.push(address.privinceName);
    region.push(address.cityName);
    region.push(address.districtName);
    this.setData({
      addressInfo: address,
      region: region
    });
  },
  /*
   * 默认地址的选择按钮状态
   */
  changeStatus: function () {
    this.setData({
      status: !this.data.status,
    });
  },
  /*
   * 获取userName值
   */
  bindUserName: function (event) {
    this.setData({
      "addressInfo.userName": event.detail.value
    });
  },
  /*
   * 获取telPhone的值
   */
  bindTelPhone: function (event) {
    this.setData({
      "addressInfo.telPhone": event.detail.value
    });
  },
  /* 
   * 获取地址选择器上的内容
   */
  bindRegionChange: function (e) {
    var region = e.detail.value
    this.setData({
      region: region,
      'addressInfo.privinceName': region[0],
      'addressInfo.cityName': region[1],
      'addressInfo.districtName': region[2]
    });
  },
  /*
   * 获取detailInfo的值
   */
  bindDetailInfo: function (event) {
    this.setData({
      "addressInfo.detailInfo": event.detail.value
    });
  },
  /*
   * 获取postalCode的值
   */
  bindPostalCode: function (event) {
    this.setData({
      "addressInfo.postalCode": event.detail.value
    });
  },
  /* 
   * 公共的提示方法
   */
  commonShowToast(title) {
    wx.showToast({
      title: title
    })
  },
  /* 
   * 校验成功后发送请求更新地址的方法
   */
  requestMethod: function () {
    var address = this.data.addressInfo;
    wx.request({
      url: utils.baseUrl + 'operations/address/' + address.id,
      data: address,
      method: "PUT",
      headers: { 'Content-Type': 'application/' },
      success: res => {
        wx.navigateBack({ delta: 1 }); // 回退到商品详情页面，并显示已选择的地址信息
      },
      fial: res => {
        this.commonShowToast("更新失败");
      }
    });
  },
  /* 
   * 校验用户是否登陆，如果没有登陆则登陆，已经登陆则获取user_id
   */
  getUserIdMethod: function () {
    var now = Date.parse(new Date());
    var user_id;
    var result;
    result = utils.commonGetStorage("userInfo", now);
    if (!result) {
      this.commonShowToast("请先登陆");
      wx.switchTab({
        url: '/pages/my/my',
      });
    } else {
      user_id = result.user_id;
      this.setData({
        'addressInfo.user': user_id
      });
    }
  },
  /* 
   * 邮编的校验方式 
   */
  postalCodeMethod: function () {
    var postalCode = this.data.addressInfo.postalCode;
    if (!postalCode) {
      this.commonShowToast("邮编不能为空");
    } else if (!/^[0-9]{6}$/.test(postalCode)) {
      this.commonShowToast("邮编格式不正确");
      this.setData({
        'detailInfo.postalCode': postalCode
      });
    } else {
      this.setData({
        'addressInfo.default_status': this.data.status
      });
      this.getUserIdMethod();
      this.requestMethod();
    }
  },
  /* 
   * 详细地址的校验方式
   */
  detailInfoMethod: function () {
    var detailInfo = this.data.addressInfo.detailInfo;
    if (!detailInfo) {
      this.commonShowToast("地址不能为空");
    } else if (detailInfo.length < 2 || detailInfo.length > 40) {
      this.commonShowToast("地址格式不正确");
    } else {
      this.postalCodeMethod();
    }
  },
  /* 
   * 手机号的校验方式 
   */
  telPhoneMethod: function () {
    var telPhone = this.data.addressInfo.telPhone;
    if (!telPhone) {
      this.commonShowToast("手机号不能为空");
    } else if (!(/^1[3|5|6|7|8|9][0-9]{9}$/.test(telPhone))) {
        this.commonShowToast("手机格式不正确");
    } else {
      this.detailInfoMethod();
    }
  },
  /* 
   * 用户名的校验方式 
   */
  userNameMethod: function () {
    var userName = this.data.addressInfo.userName;
    if (!userName) {
      this.commonShowToast("名字不能为空");
    } else if (userName.length < 2 || userName.length > 15) {
        this.commonShowToast("名字格式不正确")
    } else {
      this.telPhoneMethod();
    }
  },
  /* 
   * 省市区的校验方法
   */
  privinceMethod: function () {
    var privinceName = this.data.addressInfo.privinceName
    if (!privinceName) {
      this.setData({
        'addressInfo.privinceName': this.data.region[0],
        'addressInfo.cityName': this.data.region[1],
        'addressInfo.districtName': this.data.region[2]
      });
    } else {
      this.userNameMethod();
    }
  },
  /* 
   * 检查内容，创建并应用
   */
  saveAndCreate: function (e) {
    this.privinceMethod();
  }
})