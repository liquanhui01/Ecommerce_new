// pages/components/find/find.js
var utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history: [
    ],
    inputContent: '',
    search_result: [],
    status: 'none',
  },
  /*
   * 获取input中的输入内容
   */
  searchProduct: function(e){
    let value = e.detail.value;
    if (value != '') {
      this.setData({
        inputContent: value
      });
    } else {
      this.setData({
        inputContent: value,
        status: true
      });
    }
  },  
  /*
   * 发起请求搜索内容，并把输入的搜索内容写入history中
   */
  bindSearch: function () {
    let history = this.data.history;
    let inputContent = this.data.inputContent
    history.push(inputContent);
    if (inputContent != '') {
      this.setData({
        history: history
      });
      // 发送请求获取搜索的商品结果
      wx.request({
        url: 'http://localhost:8000/products/list',
        data: {
          name: inputContent
        },
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        },
        success: (res) => {
          let results = res.data.results;
          for (let i = 0; i < results.length; i++){
            results[i].name = results[i].name.slice(0, 20);
          }
          if (results.length > 0) {
            this.setData({
              search_result: res.data.results,
              status: 'block'
            });
          } else {
            this.setData({
              search_result: [{ 'name': "查询的商品不存在" }],
              status: 'block'
            });
          }
        },
        fail: (err) => {
          console.log(err);
        }
      }); 

      wx.request({
        url: 'http://localhost:8000/users/searchhistory/',
        data: {
          'content': inputContent
        },
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        success: (res) => {
          console.log(res);
        },
        fail: (err) => {
          console.log("失败")
        }
      })
    } else {
      this.setData({
        search_result: [{ 'name': "查询内容不能为空" }],
        status: 'none'
      });
    }
  }
})