var utils = require("../../../utils/util.js");
import request from '../../../utils/request.js';
import api from '../../api/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    products: [],
    swiper: [],
    content: [],
    swiperLength: '',
    page: '1',
    navStatus: 'products',
    popupShow: false,
    lessStatus: true,
    userEvaluations: [
      {
        id: 1,
        name: "会飞的鸟",
        avatar: "/images/testImages/avatar01.jpg",
        content: "很喜欢，物流很给力，超赞，支持！",
        productImages: [
          "/images/testImages/honor.png",
          "/images/testImages/honor x10.png",
          "/images/testImages/honor 30s.png",
        ],
        datetime: "2020-10-16"
      },
      {
        id: 2,
        name: "奔跑的乌龟",
        avatar: "/images/testImages/avatar02.jpg",
        content: "早买早享受，早买享折扣。使用感觉极佳，必须吹一波！",
        productImages: [
          "/images/testImages/honor.png"
        ],
        datetime: "2020-10-16"
      },
      {
        id: 3,
        name: "飞奔的蜗牛",
        avatar: "/images/testImages/avatar03.jpg",
        content: "昨天收到的，很好，外观很漂亮！",
        productImages: [
          "/images/testImages/honor.png",
          "/images/testImages/honor x10.png",
          "/images/testImages/honor 30s.png",
        ],
        datetime: "2020-10-17"
      },
      {
        id: 4,
        name: "不在意",
        avatar: "/images/testImages/avatar04.jpg",
        content: "快递很快，物流非常给力，产品质量没得说，这次购物体验很好。",
        productImages: [
          "/images/testImages/honor x10.png",
          "/images/testImages/honor 30s.png",
        ],
        datetime: "2020-10-18"
      },
      {
        id: 5,
        name: "尘世繁华",
        avatar: "/images/testImages/avatar05.jpg",
        content: "非常nice",
        productImages: [
          "/images/testImages/honor.png",
          "/images/testImages/honor 30s.png",
        ],
        datetime: "2020-10-19"
      },
      {
        id: 6,
        name: "爱会消失？",
        avatar: "/images/testImages/avatar06.jpg",
        content: "产品体验很好，以后还要支持!",
        productImages: [
          "/images/testImages/honor.png",
          "/images/testImages/honor x10.png",
          "/images/testImages/honor 30s.png",
          "/images/testImages/honor x10.png",
          "/images/testImages/honor 30s.png",
        ],
        datetime: "2020-10-19"
      }
    ],
    favirate: false,
    address: '请选择收货地址',
    small_show: false,
    currentIndex: 0,
    like_status: false,
    count: 1,
    token: {}
  },

  /* 
   * 对请求来的数据做处理，根据image_type来把轮播图和内容图分类并赋值
   */
  imagesByCategory: function (data) {
    var content = [];
    var swiper = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].image_type == 1) {
        content.push(data[i].image);
      } else {
        swiper.push(data[i].image);
      }
      this.setData({
        content: content,
        swiper: swiper,
        swiperLength: swiper.length
      });
    }
  },
  /*
   * 页面加载
   */
  onLoad: function (options) {
    var id = options.id,
      key = 'id' + id,
      address = options.address,
      url = api.productDetail + id + "/",
      now = Date.parse(new Date()),
      token = utils.commonGetStorage('access_token', now);
    request._get(url, {}, "").then(res => {
      console.log(res.data)
      this.setData({
        products: res.data,
        id: id,
        swiper: res.data.product_images,
        swiperLength: res.data.product_images.length,
        token: token
      })
    }).catch(error => {})
  },
  /*
   * swiper滑动时触发事件
   */
  swiperChange: function (e) {
    let page = (e.detail.current + 1).toString();
    this.setData({
      page: page
    });
  },
  /* 
   * 点击小的图片轮播图显示对应的图片
   */
  chooseSwiperImage: function(e){
    var index = e.currentTarget.dataset.index
    this.setData({
      currentIndex: index
    })
  },
  /*
   * scrollPage滚动的高度
   */
  onPageScroll: function (e){
    let scrollTop = e.scrollTop;
    if(scrollTop < 270){
      this.setData({
        navStatus: "products"
      })
    } else if(scrollTop <= 480){
      this.setData({
        navStatus: "evaluation"
      })
    } else if(scrollTop > 480) {
      this.setData({
        navStatus: "detail"
      })
    }
  },
  /*
   * 点击送至的图标跳转到收货地址页面
   */
  navigateToAddressPage: function () {
    utils.navigateCommonMethod(
      "/pages/components/addressList/addressList?id=" + this.data.id
    );
  },
  /*
   * 打开底部商品选择弹窗
   */
  openPopupBox: function (){
    this.setData({
      popupShow: !this.data.popupShow,
    });
  },
  /*
   * 关闭商品选择弹窗
   */
  onClose: function (){
    this.setData({
      popupShow: !this.data.popupShow,
    });
  },
  /*
   * 点击跳转到所有评论页面
   */
  navigateToEvaluationsPage: function () {
    utils.navigateCommonMethod(
      "/pages/components/evaluations_list/evaluations_list"
    );
  },
  /*
   * 点击选择收藏或点击取消收藏
   */
  favirateOrNot: function () {
    this.setData({
      favirate: !this.data.favirate
    });
  },
  /*
   * 点击购物车图标跳转到购物车页面
   */
  navigateToCartPage: function(){
    wx.switchTab({
      url: '/pages/order/order'
    })
  },
  /* 
   * 点击选择是否喜欢商品(收藏) 
   */
  changeLikeStatus: function(e){
    this.setData({
      like_status: !this.data.like_status
    })
  },
  /* 
   * 点击修改商品的数量
   */
  onChange: function(e){
    this.setData({
      count: e.detail
    })
  },
  /* 
   * 提交购物信息到后台
   */
  shoppingCart: function(e){
    let products_id = this.data.id,
      price = e.target.dataset.price,
      total_price = this.data.count * price,
      access_token = this.data.token.access_token,
      refresh = this.data.token.refresh,
      user_id = this.data.token.id,
      total_token = "Bearer " + access_token,
      shopping_data = {
        products: products_id,
        user: user_id,
        count: this.data.count,
        total_price: total_price,
        operate_type: "cre"
      };
    console.log(total_price)
    if(!this.data.token.access_token){
      wx.showToast({
        title: '请先登陆账户',
        icon: 'none'
      })
      setTimeout(() => {
        wx.switchTab({url: '/pages/my/my',})
      }, 1000)
    } else {
      request._post(api.shoppingCart, shopping_data, total_token).then(res => {

        console.log(products_id)
      }).catch(error => {
        console.log(error)
      })
    }
  }
})