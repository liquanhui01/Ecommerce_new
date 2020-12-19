// 获取所有变量
const app = getApp()
// 基本的url
const baseUrl = "http://localhost:8000/"

// 创建对象
const http = ({url, method, data, token, url_type=1} = {}) => {
  return new Promise((resolve, reject) => {
    console.log(url_type)
    wx.request({
      url: url_type==1 ? baseUrl + url : url,
      method: method || "GET",
      data: data || {},
      header: {
        "content_type": "application/json",
        Authorizaton: token || ""
      },
      success: res => {
        console.log(url)
          resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

// get请求
const _get = (url, data, token, url_type) => {
  return http({
    url: url,
    data:data,
    method:"GET",
    token: token,
    url_type: url_type
  })
}

// post请求
const _post = (url, data, token, url_type) => {
  return http({
    url: url,
    data:data,
    method:"POST",
    token: token,
    url_type: url_type
  })
}

// put请求
const _put = (url, data, token, url_type) => {
  return http({
    url: url,
    data: data,
    method: "PUT",
    token: token,
    url_type: url_type
  })
}

// delete请求
const _delete = (url, data, token, url_type) => {
  return http({
    url: url,
    data: data,
    method: "DELETE",
    token: token,
    url_type: url_type
  })
}

// 使用lin-ui封装一个toast方法
const commonToast = (title, icon) => {
  wx.lin.showToast({
    title: title,
    icon: icon,
    success: (res) => {
      console.log(res)
    },
    complete: (res) => {
      console.log(res)
    }
  })
}

module.exports = {
  baseUrl,
  _get,
  _post,
  _put,
  _delete,
  commonToast
}