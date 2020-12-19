// components/evaluation_star/evaluation_star.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    stars_list:[
      '/images/tabs/star_selected.png',
      '/images/tabs/star_selected.png',
      '/images/tabs/star_selected.png',
      '/images/tabs/star_selected.png',
      '/images/tabs/star_selected.png',
    ],
    star_content: "非常好",
    star_content_list:[
      "非常差",
      "差",
      "一般",
      "好",
      "非常好"
    ],
    index: 5,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addStar: function (e) {
      let index = e.currentTarget.dataset.index; // 获取星星的下标索引
      let templateStars = this.data.stars_list;
      let star_content_list = this.data.star_content_list;
      let star_content = this.data.star_content;
      let len = templateStars.length;
      for (var i = 0; i < len; i++) {
        if (i <= index) {
          templateStars[i] = "/images/tabs/star_selected.png";
        } else {
          templateStars[i] = "/images/tabs/star.png";
        }
      }
      star_content = star_content_list[index];
      this.setData({
        stars_list: templateStars,
        star_content: star_content,
        index: index + 1
      });
      this.triggerEvent("getCount", { 'count': this.data.index });
    }
  },
})
