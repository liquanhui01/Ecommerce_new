// pages/category/category.js
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    curNav: 1,
    curIndex: 0, 
  },
  /*
   * 页面加载时直接从缓存中获取分类信息，如果获取到则赋值给变量
   * 如果获取不到则发起请求从获取数据赋值给变量并把数据添加到缓存中
   */
  onLoad: function (options) {
    var now = Date.parse(new Date());
    var result = utils.commonGetStorage('category', now);
    if (result === "") {
      wx.request({
        url: 'http://localhost:8000/products/category/', //仅为示例，并非真实的接口地址
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          this.setData({
            categories: res.data
          });
          utils.commonSetStorage('category', res.data, 3*24*3600*1000); // 分类数据缓存三天
        },
        fail: err => {
          console.log(err);
        }
      }); 
    } else {
      this.setData({
        categories: result
      });
    }
  },
  /*
   * 接收事件传递过来的index
   */
  switchRightTab: function (e) {
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    this.setData({
      curNav: id,
      curIndex: index
    });
  },
  /*
   * 点击跳转到指定类型的详情页面  
   */
  navigateToCategoryDetail: function (e) {
    var id = e.currentTarget.dataset.message.id;
    var name = e.currentTarget.dataset.message.name;
    var url = "/pages/components/sameCategoryProductsDetail/sameCategoryProductsDetail?id="+ id + "&name=" + name;
    utils.navigateCommonMethod(url);
  },
  /* 
   * 测试
   */
  test: function (e) {
    console.log(e);
  }
})