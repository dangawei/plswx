// app.js
const { login } = require('./api/api.js');
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    if(!wx.getStorageSync('app_token')){
      wx.login({
        success (res) {
          if (res.code) {
            //发起网络请求
            login({ code: res.code }).then((result) => {
              console.log(result)
              wx.setStorage({ key: 'code', data: res.code })
              wx.setStorage({ key: 'app_token', data: result.app_token })
              wx.setStorage({ key: 'show_id', data: result.show_id })
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
    wx.getSystemInfo({
      success:  (res) => {
        wx.setStorage({ key: 'height', data: (750 / res.windowWidth) * res.windowHeight })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
