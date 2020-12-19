// pages/components/aboutTheMall/aboutTheMall.js
var utils  = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /*
   * 跳转到certificate页面
   */
  navigateToCertificatePage: function(){
    utils.navigateCommonMethod(
      "/pages/components/certificate/certificate"
    );
  },
  /*
   * 跳转到protocol页面
   */
  navigateToProtocolPage: function(){
    utils.navigateCommonMethod(
      "/pages/components/protocol/protocol"
    );
  },
})