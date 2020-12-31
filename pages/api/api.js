const getVerifyCode = "users/code/"  // 获取验证码
const phoneUserRegister = "users/phone/" // 手机用户注册
const wechatUserRegister = "users/wechat/" // 微信用户注册
const userLogin = "users/login/" // 验证码登陆
const refreshToken = "api/token/refresh/" // 刷新Token
const updatePhoneUser = "users/update/" // 更新手机用户信息
const categoriesList = "products/categories/" // 获取分类列表信息
const productDetail = "products/details/" // 获取商品详情
const productsList = "products/list/" // 商品列表

module.exports = {
  getVerifyCode,
  phoneUserRegister,
  wechatUserRegister,
  userLogin,
  refreshToken,
  updatePhoneUser,
  categoriesList,
  productDetail,
  productsList
}
