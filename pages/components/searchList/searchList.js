// pages/components/searchList/searchList.js
import request from "../../../utils/request.js"
import api from "../../api/api.js"
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
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' },
    ],
    value1: 0,
    value2: 'a',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name = options.name
    var url = api.productsList + "?search=" + name
    request._get(url, {}).then(res => {
      this.setData({
        products: res.data.results
      })
      console.log(this.data.products)
    }).catch(error => {
      console.log(res.data)
    })
  },
})