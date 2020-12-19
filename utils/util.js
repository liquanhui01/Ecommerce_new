import request from "./request.js"

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const baseUrl = "http://localhost:8000/"

const AppId = "wxbcb47fe1fe9624bc"
const AppSecret = "b66e494dc8eb2f12d17e59fb5a8d50ac"


/* 
 * 验证用户名格式
 */
const checkUsername = function (username) {
    if (username.length <= 1 || username.length > 20) {
      request.commonToast("用户名格式不正确", "error")
      return;
    }
    return username;
}
/* 
 * 验证首次输入的密码，密码必须包括大小写字母和数字
 */
const checkPassword = function (password) {
  var password_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,13}$/;
  if (!password_reg.test(password)) {
    request.commonToast("密码格式不正确", "error")
    return;
  }
  return password;
}
/* 
 * 验证手机格式
 */
const checkPhone = function (phone) {
  var phone_reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
  if (!phone_reg.test(phone)) {
    request.commonToast("手机号格式不正确", "error")
    return;
  }
  return phone;
}
/* 
 * 校验验证码格式
 */
const checkVerifyCode = function(code){
  if(code.length != 6){
    request.commonToast("验证码格式不正确", "error")
  }
  return code
}
/* 
 * 验证手机号或者用户名
 */
const checkPhoneOrUsername = function(phone){
  var phone_reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
  if(phone_reg.test(phone)) {
    return phone;
  }
  if (phone.length <= 1 || phone.length > 20) {
    request.commonToast("用户名或手机号格式不正确", "error")
    return;
  }
  return phone;
}
/*
 * 通用的页面跳转方法
 */
const navigateCommonMethod = function(url){
  wx.navigateTo({
    url: url,
    success: (res) => {
    },
    fail: (err) => {
    }
  })
}

/*
 * 函数节流
 */
function throttle(fn, interval) {
  var enterTime = 0;//触发的时间
  var gapTime = interval || 200 ;//间隔时间，如果interval不传，则默认300ms
  return function() {
    var context = this;
    var backTime = new Date();//第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context,arguments);
      enterTime = backTime;//赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}

/*
 * 函数防抖
 */
function debounce(fn, interval) {
  var timer;
  var gapTime = interval || 1000;//间隔时间，如果interval不传，则默认1000ms
  return function() {
    clearTimeout(timer);
    var context = this;
    var args = arguments;//保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function() {
      fn.call(context,args);
    }, gapTime);
  };
}

/*
 * 网络请求公共函数
 */
function commonRequest(url, all_data, method) {
  const baseUrl = 'http://localhost:8000/';
  wx.request({
    url: baseUrl + url,
    data: all_data || {},
    method: method || "GET",
    headers: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res);
    },
    fail: function (err) {
      // console.log(err);
    }
  })
}

/* 
 * 设置添加缓存及过期时间公共函数 
 */
function commonSetStorage(key, data = {}, time) {
  var timestamp = Date.parse(new Date());
  var expiration = timestamp + time; // 缓存时间
  var total_data = {}
  total_data["data_expiration"] = expiration
  total_data['data_content'] = data
  wx.setStorageSync(key, total_data); // 缓存数据
}

/* 
 * 获取缓存数据，如果时间已过则清除缓存数据
 */
function commonGetStorage(key, now) {
  var data_expiration = wx.getStorageSync(key).data_expiration;
  if (data_expiration) {
    if (now - data_expiration >= 0) {
      wx.clearStorageSync('category');
      return ""; // 过期则删除，并返回为空字符
    }
    return wx.getStorageSync(key).data_content; // 未过期则返回未内容
  } else {
    return "";
  }
}

/* 
* 公共的showToast方法
*/
function commonShowToast(title, icon="none", time=1000){
  wx.showToast({
    title: title,
    icon: icon,
    duration: time
  });
}

module.exports = {
  formatTime: formatTime,
  navigateCommonMethod: navigateCommonMethod,
  throttle: throttle,
  debounce: debounce,
  commonRequest: commonRequest,
  commonSetStorage: commonSetStorage,
  commonGetStorage: commonGetStorage,
  baseUrl: baseUrl,
  AppId: AppId,
  AppSecret: AppSecret,
  commonShowToast: commonShowToast,
  checkUsername,
  checkPassword,
  checkPhone,
  checkVerifyCode,
  checkPhoneOrUsername
}
