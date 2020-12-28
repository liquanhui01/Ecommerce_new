// pages/category/category.js
var utils = require('../../utils/util.js')
import request from '../../utils/request.js'
import api from '../api/api.js'
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
      request._get(api.categoriesList, {}, "").then(res => {
        console.log(res)
        this.setData({
          categories: res.data.results
        })
      }).catch(error => {
        console.log(error)
      })
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
    var url = "/pages/components/productDetail/productDetail?id="+ id;
    utils.navigateCommonMethod(url);
  },
})