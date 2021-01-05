// pages/index/index.js
var utils = require('../../utils/util.js');
import request from "../../utils/request.js"
import api from "../api/api.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiper: [
    ],
    categories: [
    ],
    value: "",
    products:[],
    page: 1,
    next: ""
  },
  /* 
   * 初始加载
   */
  onLoad: function(option){
    var result = wx.getStorageSync('access_token').data_content
    if(!result){
      // request.commonToast("请先登陆账户")
      wx.showToast({
        title: '请先登陆账户',
        icon: 'none'
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/my/my',
        })
      }, 2000)
    } else{
      request._get(api.indexPageBanner, {}, "").then(res => {
        this.setData({
          swiper: res.data.results
        })
      }).catch(error => {
        console.log(error)
      })
    }
    request._get(api.productsList + "?page=" + this.data.page, {}, "").then(res => {
      let next = res.data.next
      this.setData({
        products: res.data.results,
        next: next
      })
      wx.lin.renderWaterFlow(this.data.products)
    }).catch(error => {
      console.log(error)
    })
  },
  /*
   * 跳转到搜索商品页面
   */
  navigateToFindPage: function(){
    utils.navigateCommonMethod(
      "/pages/components/find/find"
    );
  },
  /* 
   * 获取输入的搜索内容，并把内容传递给跳转到的页面
   */
  onSearch: function(e){
    let name = e.detail
    utils.navigateCommonMethod("/pages/components/searchList/searchList?name=" + name)
    this.setData({
      value: ""
    })
  },
  /* 
   * 跳转到详情页面
   */
  navigateProductDetail: function(e){
    var user_id = e.currentTarget.dataset.id
    utils.navigateCommonMethod("/pages/components/productDetail/productDetail?id=" + user_id)
  },
  /* 
   * 触底刷新
   */
  onReachBottom: function(){
    var page = this.data.page + 1,
      next = this.data.next;
    if(next){
      request._get(next, {}, "", {}, 2).then(res => {
        console.log(res)
        var next = res.data.next;
        this.setData({
          products: res.data.results,
          next: next
        })
        wx.lin.renderWaterFlow(this.data.products)
      }).catch(error => {
        console.log(error)
      })
    } else {
      console.log("最后一页")
    }
  }
})
