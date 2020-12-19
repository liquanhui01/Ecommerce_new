// pages/components/sameCategoryProductsDetail/sameCategoryProductsDetail.js
var utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top_nav: false,
    top_nav_base: true,
    distance: '',
    id: '',
    category_name: '',
    middle_url: 'products/productscategory/',
    parameter: '',
    products: [],
    all_status: true,
    shop_status: false,
    sold_status: false,
    filter_status: false,
    shop_icon: 'hidden',
    sold_icon: 'hidden',
    filter_content_status: true,
    lowest: '',
    highest: '',
  },

  /* 
   * 公用的检查缓存，如果不存在发送请求，并加入缓存 
   */
  commonStorageOrRequest: function (key, url, now) {
    var result = utils.commonGetStorage(key, now);
    if (!result) {
      wx.request({
        url: utils.baseUrl + url,
        data: {},
        headers: {
          "Content-Type": "application/json"
        },
        method: "GET",
        success: res => {
          this.setData({
            products: res.data,
          });
          utils.commonSetStorage(key, res.data, 1 * 6 * 3600 * 1000);
        },
        fail: err => {
          console.log(err);
        }
      }); 
    } else {
      this.setData({
        products: result
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var url = this.data.middle_url + id;
    var category_name = options.name;
    var now = Date.parse(new Date());
    this.commonStorageOrRequest(category_name, url, now, 1);
    this.setData({
      id: id,
      category_name: category_name,
    });
  },
  /*
   * 公共的发送请求方法 
   */
  commonRequest: function (url) {
    wx.request({
      url: utils.baseUrl + url,
      data: {},
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      success: res => {
        this.setData({
          products: res.data
        });
      },
      fail: err => console.log(err)
    });
  },
  /* 
   * 点击改变“全部”的状态
   */
  changeAllStatus: function (e) {
    var url = this.data.middle_url + this.data.id;
    var now = Date.parse(new Date());
    this.setData({
      all_status: true,
      shop_status: false,
      sold_status: false,
      shop_icon: 'hidden',
      sold_icon: 'hidden',
      filter_status: false,
      filter_content_status: true,
    });
    this.commonStorageOrRequest(this.data.category_name, url, now);
  },
  /*
   * 点击改变价格区域的样式，并根据请求获取到对应的数据
   */
  changeShopStatus: function (e) {
    let parameter = this.data.shop_status ? "-shop_price" : 'shop_price';
    let url = this.data.middle_url + this.data.id + "?ordering=" + parameter;
    let now = Date.parse(new Date());
    let key;
    this.setData({
      all_status: false,
      shop_status: !this.data.shop_status,
      sold_status: false,
      shop_icon: 'visible',
      sold_icon: 'hidden',
      filter_status: false,
      filter_content_status: true,
    });
    if (parameter == "-shop_price") {
      key = this.data.category_name + "descending_shop_price";
    } else {
      key = this.data.category_name + "ascending_shop_price";
    }
    this.commonStorageOrRequest(key, url, now);
  },
  /*
   * 点击改变销量区域的样式，并根据请求获取到对应的数据
   */
  changeSoldStatus: function (e) {
    let parameter = this.data.sold_status ? "-sold_num" : "sold_num";
    let url = this.data.middle_url + this.data.id + "?ordering=" + parameter;
    let now = Date.parse(new Date());
    let key;
    this.setData({
      all_status: false,
      shop_status: false,
      sold_status: !this.data.sold_status,
      shop_icon: 'hidden',
      sold_icon: 'visible',
      filter_status: false,
      filter_content_status: true,
    });
    if (parameter == "-sold_num") {
      key = this.data.category_name + "descending_sold_num";
    } else {
      key = this.data.category_name + "ascending_sold_num";
    }
    this.commonStorageOrRequest(key, url, now);
  },
  /*
   * 点击改变筛选区域的样式，并根据请求获取到对应的数据
   */
  changeFilterStatus: function (e) {
    this.setData({
      filter_status: !this.data.filter_status,
      all_status: false,
      filter_content_status: !this.data.filter_content_status,
      shop_status: false,
      sold_status: false,
      shop_icon: 'hidden',
      sold_icon: 'hidden',
      lowest: '',
      highest: ''
    });
  },
  /* 
   * 获取最低价格
   */
  getlowestPrice: function (options) {
    this.setData({
      lowest: options.detail.value
    });
  },
  /* 
   * 获取最高的价格
   */
  gethighestPrice: function (options) {
    this.setData({
      highest: options.detail.value
    });
  },
  /* 
   * 判断输入内容是否为空和是否为数值类型，发送请求，获取价格区间内的数据
   */
  submitValues: function (e) {
    var lowest = this.data.lowest;
    var highest = this.data.highest;
    var parameter = "?lowest_price=" + lowest + '&highest_price=' + highest;
    var url = this.data.middle_url + this.data.id + parameter;
    if (lowest.length == 0 || highest.length == 0) {
      wx.showToast({
        title: "价格不能为空",
        duration: 1000
      })
    } else {
      var re = /^[0-9]+.?[0-9]*/;
      if (!re.test(lowest) || !re.test(highest)) {
        wx.showToast({
          title: "内容必须为数字",
          duration: 1000
        });
      } else {
        this.commonRequest(url);
        this.setData({
          lowest: '',
          highest: '',
          filter_content_status: true,
          filter_status: false
        });
      }
    }
  },
  /* 
   * 获取距离顶部的位置，从而判断顶部导航栏的显示与隐藏
   */
  onPageScroll: function (e) {
    var real_distance = e.scrollTop;
    if (real_distance >= 78) {
      this.setData({
        top_nav: true,
        top_nav_base: false,
        distance: real_distance
      })
    } else {
      this.setData({
        top_nav: false,
        top_nav_base: true,
        distance: real_distance
      })
    }
  },
  /* 
   * 重置输入框内容
   */
  resetValues: function (e) {
    this.setData({
      lowest: '',
      highest: ''
    });
  },
  NavigateToProductDetailPage: function (e) {
    var id = e.currentTarget.dataset.id;
    utils.navigateCommonMethod("/pages/components/productDetail/productDetail?id=" + id);
  },
})