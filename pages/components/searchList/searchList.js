// pages/components/searchList/searchList.js
import request from "../../../utils/request.js"
import api from "../../api/api.js"
var utils = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [],
    option1: [
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '热销商品', value: 2 },
    ],
    option2: [
      { text: '默认排序', value: 'a' },
      { text: '价格升序', value: 'b' },
      { text: '价格降序', value: 'c' },
      { text: '销量升序', value: 'd' },
      { text: '销量降序', value: 'e' }
    ],
    value1: 0,
    value2: 'a',
    name: '',
    url: '',
    left_show: false,
    right_show: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name = options.name
    var url = api.productsList + "?search=" + name
    request._get(url, {}).then(res => {
      this.setData({
        products: res.data.results,
        name: name
      })
      console.log(this.data.products)
    }).catch(error => {
      console.log(res.data)
    })
  },
  /* 
   * 左侧选择按钮
   */
  value1Change: function(e){
    var value1 = e.detail,
      url = '',
      name = this.data.name;
    if(value1 == 0){
      url = api.productsList + "?name=" + name
    } else if(value1 == 1){
      url = api.searchListIsNew + name
    } else {
      url = api.searchListIsHot + name
    }
    this.setData({
      url: url
    })
    request._get(url, {}).then(res => {
      this.setData({
        products: res.data.results
      })
    }).catch(error => {
      console.log(error)
    })
  },
  /* 
   * 右侧选择按钮
   */
  value2Change: function(e){
    var value2 = e.detail,
      url = '',
      left_show = this.data.left_show,
      origin_url = this.data.url,
      name = this.data.name;
    if(!left_show){
      origin_url = api.productsList + "?name=" + name
    }
    if(value2 == 'b'){
      url = origin_url + '&ordering=shop_price'
    } else if(value2 == 'c'){
      url = origin_url + '&ordering=-shop_price'
    } else if(value2 == 'd'){
      url = origin_url + '&ordering=sold_num'
    } else if(value2 == 'e'){
      url = origin_url + '&ordering=-sold_num'
    }
    request._get(url, {}).then(res => {
      this.setData({
        products: res.data.results
      })
    }).catch(error => {
      console.log(error)
    })
  },
  navigateButton: function(e){
    var user_id = e.currentTarget.dataset.id
    utils.navigateCommonMethod("/pages/components/productDetail/productDetail?id=" + user_id)
  }
})