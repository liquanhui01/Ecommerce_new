const getVerifyCode = "users/code/"  // 获取验证码
const phoneUserRegister = "users/phone/" // 手机用户注册
const wechatUserRegister = "users/wechat/" // 微信用户注册
const userLogin = "users/login/" // 验证码登陆
const refreshToken = "api/token/refresh/" // 刷新Token
const updatePhoneUser = "users/update/" // 更新手机用户信息
const categoriesList = "products/categories/" // 获取分类列表信息
const productDetail = "products/details/" // 获取商品详情
const productsList = "products/list/" // 商品列表
const searchListIsNew = "products/list/?is_new=true&name=" // 根据名字和是否是新品来获取指定商品的列表
const searchListIsHot = "products/list/?is_hot=true&name=" // 根据名字和是否是热销品来获取指定商品的列表
const indexPageBanner = "products/banners/" // 首页轮播图
const shoppingCart = "operations/shoppingcart/" // 购物车增删改查


module.exports = {
  getVerifyCode,
  phoneUserRegister,
  wechatUserRegister,
  userLogin,
  refreshToken,
  updatePhoneUser,
  categoriesList,
  productDetail,
  productsList,
  searchListIsNew,
  searchListIsHot,
  indexPageBanner,
  shoppingCart
}
