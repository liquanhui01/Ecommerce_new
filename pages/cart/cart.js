// pages/order/order.js
var utils = require('../../utils/util.js')
import request from '../../utils/request.js'
import api from '../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [],
    token: '',
    checked: true,
    all_selected: false,
    all_price: 0.00,
    cart_total_price: 0.00
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var now = Date.parse(new Date()),
      token = utils.commonGetStorage("access_token", now),
      total_token = "Bearer " + token.access_token;
    request._get(api.shoppingCart, {}, total_token).then(res => {
      console.log(res.data.results)
      this.setData({
        products: res.data.results,
        token: token
      })
    }).catch(error => {
      console.log(error)
    })
  },
  addCount: function(e){
    console.log(e)
    var products_id = e.target.dataset.id,
      price = e.target.dataset.price,
      total_token = "Bearer " + this.data.token.access_token,
      user_id = this.data.token.id,
      shopping_data = {
        products: products_id,
        user: user_id,
        count: 1,
        total_price: price,
        operate_type: 'add'
      };
    request._put(api.shoppingCart + products_id + "/", shopping_data, total_token).then(res => {
      this.onLoad()
    }).catch(error => {
      console.log(error)
    })
  },
  deleteCount: function(e){
    var products_id = e.target.dataset.proid,
      price = e.target.dataset.price,
      id = e.target.dataset.id,
      total_token = "Bearer " + this.data.token.access_token,
      user_id = this.data.token.id,
      shopping_data = {
        products: products_id,
        user: user_id,
        count: 1,
        total_price: price,
        operate_type: 'del'
      };
      request._put(api.shoppingCart + products_id + "/", shopping_data, total_token).then(res => {
        this.onLoad()
      }).catch(error => {
        console.log(error)
      })
    // }
  },
  /* 
   * 点击是否全选
   */
  changeSelecte: function(e){
    let cart_total_price = this.data.cart_total_price,
      products = this.data.products;
    this.setData({
      all_selected: !this.data.all_selected,
    })
    if(!this.data.all_selected){
      this.setData({
        cart_total_price: 0.00
      })
    } else {
      for(let i = 0; i < products.length; i++){
        cart_total_price += products[i].total_price
      }
      this.setData({
        cart_total_price: parseFloat(cart_total_price).toFixed(2)
      })
    }
  },
  /* 
   * 删除指定的购物车商品
   */
  deleteCartProoduct: function(e){
    let products_id = e.target.dataset.id,
      total_token = "Bearer " + this.data.token.access_token
    request._delete(api.shoppingCart + products_id, {}, total_token).then(res => {
      this.onLoad()
    }).catch(error => {
      console.log(error)
    })
  }
})