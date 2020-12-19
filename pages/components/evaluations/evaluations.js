// pages/components/evaluations/evaluations.js
var utils = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picture_list: [],
    anonymous_status: true,
    evaluation_data: {
      "total_evaluation": 5,
      "product_evaluation": 5,
      "transPort_evaluation": 5,
      "personService_evaluation": 5
    },
    remaining_words: 200,
    product_id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var product_id = options.product_id;
    this.setData({
      product_id: product_id
    });
  },
  /* 
   * 公共的提示方法
   */
  commonShowToast: function (title) {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 1000
    })
  },
  onReady: function () {
    //  页面初次渲染完成后，使用选择器选择组件实例节点，返回匹配到组件实例对象  
    this.myComponent = this.selectComponent('#evaluation_star')
  },
  /* 
   * 获取总评分 
   */
  getTotalCount: function (e) {
    var count = e.detail.count;
    this.setData({
      'evaluation_data.total_evaluation': count
    });
 　},
  /* 
   * 获取评论的具体内容 
   */
  getEvaluationDetailContent: function (e) {
    var detail_content = e.detail.value;
    var len = detail_content.length;
    this.setData({
      'evaluation_data.detail_content': detail_content,
      remaining_words: 200 - len
    });
  },
  /* 
   * 添加图片 
   */
  selectImages: function (e) {
    var that = this;
    var picture_list = this.data.picture_list
    if (picture_list.length <= 8) {
      wx.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          var filePath = res.tempFilePaths[0];//tempFilePaths类型StringArray，图片的本地文件路径列表
          that.setData({
            picture_list: that.data.picture_list.concat(filePath),
          });
          console.log(that.data.picture_list);
        }
      }); 
    } else {
      this.commonShowToast("图片最多9张");
    }
  },
  /* 
   * 预览图片
   */
  previewImage: function (e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: this.data.picture_list // 需要预览的图片http链接列表
    });
  },
  /* 
   * 删除指定的图片 
   */
  deleteImage: function (e) {
    var index = e.currentTarget.dataset.index;
    var picture_list = this.data.picture_list
    picture_list.splice(index, 1);
    this.setData({
      picture_list: picture_list
    });
  },
  /* 
   * 获取商品包装评分 
   */
  getProductCount: function (e) {
    var count = e.detail.count;
    this.setData({
      'evaluation_data.product_evaluation': count
    });
  },
  /* 
   * 获取运输评分 
   */
  getTransportCount: function (e) {
    var count = e.detail.count;
    this.setData({
      'evaluation_data.transPort_evaluation': count
    });
  },
  /* 
   * 获取快递员服务评分 
   */
  getPersonServiceCount: function (e) {
    var count = e.detail.count;
    this.setData({
      'evaluation_data.personService_evaluation': count
    });
  },
  /* 
   * 修改打勾按钮的状态，调整图片
   */
  changeTickStatus: function (e) {
    this.setData({
      anonymous_status: !this.data.anonymous_status,
      'evaluation_data.anonymous_status': this.data.anonymous_status
    });
    console.log(this.data.evaluation_data);
  },
  /* 
   * 发表评论 
   */
  submitEvaluation: function (e) {
    var detail_content = this.data.evaluation_data.detail_content;
    if (!detail_content) {
      this.commonShowToast("内容不能为空");
    }
    var evaluation_data = this.data.evaluation_data
    evaluation_data['user'] = "99a5fc83c1e242e5aff26f59cc3760ec"
    evaluation_data['product'] = 1
    wx.request({
      url: utils.baseUrl + "operations/evaluation/",
      data: evaluation_data,
      method: "POST",
      headers: { "Content-Type": "application/json"},
      success: (res) => {
        var evaluation_id = res.data.id;
        const tempFilePaths = this.data.picture_list;
        for (var i = 0; i < tempFilePaths.length; i++){
          wx.uploadFile({
            url: utils.baseUrl + "operations/evaluationimage/", 
            filePath: tempFilePaths[i],
            name: 'images',
            formData: {
              "product": 1,
              "evaluation": evaluation_id
            },
            headers: {
              'content_type': 'multipart/form-data'
            },
            success(res) {
              console.log(res.data);
            },
            fail: err => {
              console.log(err);
            }
          }) 
        }  
      }
    });
    console.log(this.data.evaluation_data);
  },
})