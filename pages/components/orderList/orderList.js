// pages/components/orderList/orderList.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    totalOrderMessages:[
      {
        orderId: '121324532',
        time: '17:32:30',
        products: [
          {
            title: "[10条装] 莫代尔袜子男士夏季短袜薄款",
            image: "/images/testImages/13.jpg",
            count: 1,
            price: 2399,
          }
        ],
        totalcount: 1,
        totalPrice: 2399,
        status: 0
      },
      {
        orderId: '121324532',
        time: '17:32:30',
        products: [
          {
            title: "[10条装] 莫代尔袜子男士夏季短袜薄款",
            image: "/images/testImages/13.jpg",
            count: 1,
            price: 2399,
          },
          {
            title: "[15条装] 莫代尔袜子男士夏季短袜薄款",
            image: "/images/testImages/13.jpg",
            count: 5,
            price: 10000,
          },
        ],
        totalcount: 6,
        totalPrice: 12399,
        status: 0
      },
      {
        orderId: '121324532',
        time: '2020-10-10 17:32:30',
        products: [
          {
            title: "[10条装] 莫代尔袜子男士夏季短袜薄款",
            image: "/images/testImages/13.jpg",
            count: 1,
            price: 2399,
          },
          {
            title: "[15条装] 莫代尔袜子男士夏季短袜薄款",
            image: "/images/testImages/13.jpg",
            count: 5,
            price: 10000,
          },
          {
            title: "[15条装] 莫代尔袜子男士夏季短袜薄款",
            image: "/images/testImages/13.jpg",
            count: 5,
            price: 10000,
          },
        ],
        totalcount: 6,
        totalPrice: 12399,
        status: 1
      },
      {
        orderId: '121324532',
        time: '2020-10-10 17:32:30',
        products: [
          {
            title: "[10条装] 莫代尔袜子男士夏季短袜薄款",
            image: "/images/testImages/13.jpg",
            count: 1,
            price: 2399,
          },
          {
            title: "[15条装] 莫代尔袜子男士夏季短袜薄款",
            image: "/images/testImages/13.jpg",
            count: 5,
            price: 10000,
          },
        ],
        totalcount: 6,
        totalPrice: 12399,
        status: 1
      },
    ],
    willPay: [
      {
        orderId: '121324532',
        time: '17:32:30',
        products: [
          {
            title: "[10条装] 莫代尔袜子男士夏季短袜薄款",
            image: "/images/testImages/13.jpg",
            count: 1,
            price: 2399,
          }
        ],
        totalcount: 1,
        totalPrice: 2399,
        status: 0
      },
      {
        orderId: '121324532',
        time: '17:32:30',
        products: [
          {
            title: "[10条装] 莫代尔袜子男士夏季短袜薄款",
            image: "/images/testImages/13.jpg",
            count: 1,
            price: 2399,
          },
          {
            title: "[15条装] 莫代尔袜子男士夏季短袜薄款",
            image: "/images/testImages/13.jpg",
            count: 5,
            price: 10000,
          },
          {
            title: "[15条装] 莫代尔袜子男士夏季短袜薄款",
            image: "/images/testImages/13.jpg",
            count: 5,
            price: 10000,
          },
        ],
        totalcount: 6,
        totalPrice: 12399,
        status: 0
      },
    ],
    shipped: [
      {
        orderId: '121324532',
        time: '2020-10-10 17:32:30',
        products: [
          {
            title: "[10条装] 莫代尔袜子男士夏季短袜薄款",
            image: "/images/testImages/13.jpg",
            count: 1,
            price: 2399,
          },
          {
            title: "[15条装] 莫代尔袜子男士夏季短袜薄款",
            image: "/images/testImages/13.jpg",
            count: 5,
            price: 10000,
          },
        ],
        totalcount: 6,
        totalPrice: 12399,
        status: 1
      },
    ],
    received: [
      {
        orderId: '121324532',
        time: '2020-10-10 17:32:30',
        products: [
          {
            title: "[10条装] 莫代尔袜子男士夏季短袜薄款",
            image: "/images/testImages/13.jpg",
            count: 1,
            price: 2399,
          },
          {
            title: "[15条装] 莫代尔袜子男士夏季短袜薄款",
            image: "/images/testImages/13.jpg",
            count: 5,
            price: 10000,
          },
        ],
        totalcount: 6,
        totalPrice: 12399,
        status: 1
      },
    ], 
    active: '',
  },
  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option){
    let index = option.index;
    this.setData({
      active: index
    });
  },
  /*
   * 点击切换方法模版
   */
  clickCheck: function(event){
    let index = event.target.dataset.index;
    this.setData({
      active: index
    });
  },
  /*
   * 首页页面点击事件
   */
  checkTotalTap: function(event){
    this.clickCheck(event);
  },
  /*
   * 未付款页面点击事件
   */
  checkWillPayTap: function(event){
    this.clickCheck(event);
  },
  /*
   * 已发货页面点击事件
   */
  checkShippedTap: function(event){
    this.clickCheck(event);
  },
  /*
   * 已完成页面点击事件
   */
  checkReceivedTap: function(event){
    this.clickCheck(event);
  }
})