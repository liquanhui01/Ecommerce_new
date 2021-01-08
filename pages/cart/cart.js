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
        result: [],
        selected_list: [],
        selected: true,
        token: '',
        checked: true,
        all_selected: false,
        all_price: 0.00,
        cart_total_price: 0.00
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var now = Date.parse(new Date()),
            token = utils.commonGetStorage("access_token", now),
            total_token = "Bearer " + token.access_token;
        request._get(api.shoppingCart, {}, total_token).then(res => {
            this.setData({
                products: res.data.results,
                token: token.access_token
            })
            console.log(this.data.products)
        }).catch(error => {
            console.log(error)
        })
    },
    /* 
     * 增加商品数量
     */
    addCount: function(e) {
        var products_id = e.target.dataset.proid,
            price = e.target.dataset.price,
            total_token = "Bearer " + this.data.token,
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
    /* 
     * 减少商品数量
     */
    deleteCount: function(e) {
        var products_id = e.target.dataset.proid,
            price = e.target.dataset.price,
            total_token = "Bearer " + this.data.token,
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
    },
    /* 
     * 点击是否全选
     */
    changeSelecte: function(e) {
        let cart_total_price = this.data.cart_total_price,
            products = this.data.products;
        this.setData({
            all_selected: !this.data.all_selected,
        })
        if (!this.data.all_selected) {
            this.setData({
                cart_total_price: 0.00
            })
        } else {
            for (let product of products) {
                cart_total_price += product.total_price
            }
            this.setData({
                cart_total_price: parseFloat(cart_total_price).toFixed(2)
            })
        }
    },
    /* 
     * 删除指定的购物车商品
     */
    deleteCartProduct: function(e) {
        let products_id = e.target.dataset.id,
            total_price = e.target.dataset.totalprice,
            cart_total_price = this.data.cart_total_price,
            total_token = "Bearer " + this.data.token;
        request._delete(api.shoppingCart + products_id, {}, total_token).then(res => {
            this.onLoad()
            this.setData({
                selected: false,
                cart_total_price: 0.00
            })
        }).catch(error => {
            console.log(error)
        })
    },
    /* 
     * 下拉刷新
     */
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading() //启用标题栏显示加载状态
        this.onLoad() //调用相关方法
        setTimeout(() => {
            wx.hideNavigationBarLoading() //隐藏标题栏显示加载状态
            wx.stopPullDownRefresh() //结束刷新
        }, 400); //设置执行时间
    },
    /*
     * 复选按钮
     */
    onChange(e) {
        var id = e.currentTarget.dataset.id,
            cart_total_price = this.data.cart_total_price,
            selected = this.data.selected;
        var products = this.data.products;
        console.log(selected)
        for (let i = 0; i < e.detail.length; i++) {
            i = Number(i)
            if (selected) {
                cart_total_price += this.data.products[i].total_price
            } else {
                cart_total_price -= this.data.products[i].total_price
            }
        }
        console.log(cart_total_price)
        this.setData({
            selected: !selected,
            result: e.detail,
            cart_total_price: cart_total_price
        })
    },
})