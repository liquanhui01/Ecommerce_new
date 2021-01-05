// components/my_water_flow/my_water_flow.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onProduct: function(e){
      var id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/components/productDetail/productDetail?id=' + id,
      })
    }
  }
})
