// pages/components/integral/integral.js
import tool from "../../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: true,
    scrollStatus: false,
    integralCount: 0,
    products: [
      {
        title: "米家防溅指甲刀",
        newPrice: '99',
        originPrice: '9.9',
        image: "/images/testimages/nail-clippers.jpg"
      },
      {
        title: "小米巨能写 10支装",
        newPrice: '99',
        originPrice: '9.99',
        image: "/images/testimages/pen.jpg"
      },
      {
        title: "米家插电夜灯 白色",
        newPrice: '399',
        originPrice: '19.9',
        image: "/images/testimages/light.jpg"
      },
      {
        title: "贝医生0+防蛀牙膏",
        newPrice: '299',
        originPrice: '12.2',
        image: "/images/testimages/toothpaste.jpg"
      },
      {
        title: "米家智能插座wifi",
        newPrice: '4900',
        originPrice: '49',
        image: "/images/testimages/socket.jpg"
      },
      {
        title: "米家自动洗衣机套装",
        newPrice: '7900',
        originPrice: '79',
        image: "/images/testimages/suit.jpg"
      }
    ],
    productsStatus: 'products',
    coupons: {
      five: {
        amount: 5.00,
        title: "满1件可用",
        price: 199,
        boughtStatus: true
      },
      ten: {
        amount: 10.00,
        title: "满59可用",
        price: 399,
        boughtStatus: true
      },
      twenty:{
        amount: 20.00,
        title: "满199可用",
        price: 999,
        boughtStatus: true
      },
      fifty: {
        amount: 50.00,
        title: "满299可用",
        price: 1990,
        boughtStatus: true
      }
    },
    recharge: {
      five: {
        title: "30积分",
        price: 5.00,
        rechargeStatus: true
      },
      ten: {
        title: "60积分",
        price: 10.00,
        rechargeStatus: true
      },
      twenty: {
        title: "120积分",
        price: 20.00,
        rechargeStatus: true
      }
    },
  },
  /*
   * 监听页面滚动的距离
   * 判断距离顶部是否超过170，如果超过，则头部导航显示，中部导航隐藏，
   * 如果不超过，则中部导航显示，头部导航隐藏
   */
  onPageScroll: tool.throttle(function(e){
    // 导航栏是否显示判断
    let distance = e[0].scrollTop;
    if(distance >= 205){
      this.setData({
        status: false,
        scrollStatus: true
      });
    } else {
      this.setData({
        status: true,
        scrollStatus: false
      });
    }
    // 导航栏中元素具体是否选中判断
    if(distance < 300){
      this.setData({
        productsStatus: "products"
      });
    } else if(distance < 550){
      this.setData({
        productsStatus: "money"
      });
    } else if(distance >= 550){
      this.setData({
        productsStatus: "recharge"
      });
    }
  }),
  /*
   * 优惠券点击兑换后的提示信息模版
   */
  couponsMessage: function(text, integral, coupons){
    let key = 'coupons.'+text+'.boughtStatus';
    wx.showModal({
      title: "提示",
      content: "是否确定使用" + integral + "积分兑换" + coupons + "元优惠券?",
      success: (res) => {
        if(res.confirm){
          this.setData({
            [key]: false
          });
        }
      },
    });
  },
  /*
   * 兑换点击事件
   */
  bindCoucops: function (e) {
    let price = e.currentTarget.dataset.price;
    if(price == 199){
      let text = 'five'
      this.couponsMessage(text, 199, 5.00);
    } else if(price == 399){
      let text = "ten"
      this.couponsMessage(text, 399, 10.00);
    } else if(price == 999){
      let text = "twenty";
      this.couponsMessage(text, 999, 20.00);
    } else {
      let text = "fifty";
      this.couponsMessage(text, 1990, 50.00);
    }
  },
  /*
   * 积分充值提醒模版
   */
  rechargeMessage: function(text, price, integral){
    let key = "recharge." + text + ".rechargeStatus";
    wx.showModal({
      title: "提示",
      content: "是否确定充值" + price + "购买" + integral + "积分",
      success: (res) => {
        if(res.confirm){
          this.setData({
            [key]: false
          });
        }
      }
    });
  },
  /*
   * 积分充值点击模版
   */
  bindRechargeTap: function (e) {
    let price = e.currentTarget.dataset.price;
    console.log(price);
    if(price == 5.00){
      let integral = 30.00
      let text = "five";
      this.rechargeMessage(text, 5.00, integral);
    } else if(price == 10.00){
      let integral = 50.00
      let text = "ten";
      this.rechargeMessage(text, 10.00, integral);
    } else {
      let integral = 120.00
      let text = "twenty";
      this.rechargeMessage(text, 20.00, integral);
    }
  }
})