// pages/components/address/address.js
var utils = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    checked: false,
    checked_index: '',
    id: '',
    user_id: '',
    options: ''
  },

  /*
   * 抽象出公共的方法处理联系方式中间部分的隐藏功能
   */
  // hiddenNumberMethod: function (obj) {
  //   for (var i = 0; i < obj.length; i++){
  //     obj[i]['type'] = 'applet';
  //     let telPhone;
  //     let telPhoneArray = obj[i].telPhone.split('');
  //     for(var j =0; j < telPhoneArray.length; j++){
  //       telPhoneArray[3] = '*';
  //       telPhoneArray[4]= '*';
  //       telPhoneArray[5] = '*';
  //       telPhoneArray[6]= '*';
  //     };
  //     // 正则替换所有的逗号为''，不用正则只能替换第一个
  //     telPhone = telPhoneArray.join().replace(/,/g, '');
  //     obj[i].telPhone = telPhone;
  //   };
  //   return obj;
  //  },

  /*
   * 页面加载
   * 发送请求获取所有的收货信息
   * 循环取出number，拆分成字符数组，把中间四个字符串替换为*，重新拼接赋值给number
   */
  onLoad: function (options) {
    var id = options.id;
    var now = Date.parse(new Date());
    var result = utils.commonGetStorage('userInfo', now);
    var user_id;
    var old_address;
    var options = options;
    if (!result) {
      wx.showToast({
        title: "请先登陆"
      });
      wx.switchTab({
        url: '/pages/my/my',
      });
    } else {
      user_id = result.user_id;
      wx.request({
        url: utils.baseUrl + "operations/address/?user_id=" + user_id,
        data: {},
        method: "GET",
        headers: { "content-type": "application/json" },
        success: res => {
          old_address = res.data;
          for (var i = 0; i < old_address.length; i++) {
            old_address[i]['type'] = "applet";
          }
          this.setData({
            address: old_address,
            user_id: this.data.user_id,
            id: id,
            options: options,
          });
        }
      });
    }
  },
  /*
   * 调取微信中已存在的收获地址
   */
  getAddressInfoFromWechat: function(){
    if(this.data.address.length < 5){
      wx.chooseAddress({
        success: (res) => {
          let wechatAddress = [];
          let address = {
            type: 'wechat',
            userName: res.userName,
            telPhone: res.telNumber,
            privinceName: res.provinceName,
            cityName: res.cityName,
            districtName: res.countyName,
            detailInfo: res.detailInfo,
            postalCode: res.postalCode
          }
          // 对获取信息中的联系方式做隐私处理
          // let newAddress = this.hiddenNumberMethod(address);
          wechatAddress.push(address);
          this.setData({
            address: this.data.address.concat(wechatAddress)
          });
        },
        fail: (err) => {
          console.log(err);
        }
      });
    }
    else{
      wx.showToast({
        title: "收货地址不能超过5个",
        icon: "none",
        duration: 2000
      });
    }
  },
  /*
   * 跳转到新增地址详情页面
   */
  navigateToAddressFormPage: function (e) {
    utils.navigateCommonMethod('/pages/components/templates/addressForm/addressForm');
  },
  /* 
   * 改变被选中的选项
   */
  changeRadio: function (e) {
    var index = e.currentTarget.dataset.index;
    var default_address = this.data.address[index];
    var total_address = default_address.privinceName +
      default_address.cityName + default_address.districtName + " "
      + default_address.detailInfo + "  "
      + default_address.userName + "   " + default_address.postalCode;
    this.setData({
      checked_index: index
    });
    let id = this.data.id;
    if (id) {
      utils.navigateCommonMethod('/pages/components/productDetail/productDetail?id=' + this.data.id + '&address=' + total_address);
    } else {
      wx.switchTab({url: "/pages/my/my"});
    }
  },
  /* 
   * 删除指定的地址信息
   */
  deleteAddress: function (e) {
    var id = e.currentTarget.dataset.id;
    // var that = this;
    wx.showModal({
      title: "提示",
      content: "确定删除改地址吗？",
      success: sm => {
        if (sm.confirm) {
          utils.commonRequest("operations/address/", { 'id': id }, "DELETE");
          this.onLoad(this.data.options);
        } else if (sm.cancel) {
        }
      }
    });
  },
  /* 
   * 点击编辑按钮跳转到指定地址的编辑页面，并把地址信息传递过去 
   */
  navigateToDetailPage: function (e) {
    var index = e.currentTarget.dataset.index;
    var index_address = JSON.stringify(this.data.address[index]);
    utils.navigateCommonMethod("/pages/components/templates/addressDetailPage/addressDetailPage?address=" + index_address);
  }
})