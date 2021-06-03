let app = getApp()
// let appSecret =  'cfJuKCQnOi7UJGdj',  //appSecret = isDebug ? 'cfJuKCQnOi7UJGdj' : '1M3uh7Rc9cFkce6E',
//     appid = "wx489d63601ae598da";

/**
 * 请求后台服务
 * 
 * 
 */
export const wxRequest =(params, method)=> {
  wx.showLoading({
    title: '加载中...',
    mask:true
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url:params.url,
      method: method || 'POST',
      data: params.data || {},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'from-type': 2,
        'app-id': 'plswechat',
        'app-token':wx.getStorageSync('app_token')?wx.getStorageSync('app_token'):'',
      },
      success(res) {
        const data = res.data
        if (data.code == 0) {
          resolve(data.data)
        } else if (data.code == '202' || data.code == '401') {
          wx.showModal({
            title: '提示',
            showCancel: false,
            confirmText: '好的',
            content: '登录过期，请重新登录!',
            success(res) {
              if (res.confirm) {
                resolve(data)
              }
            }
          })
        } else if (data.code == '1002' || data.code == '1001' || data.code == '1102' || data.code == '1103'|| data.code == '103') {
          resolve(data)
        }else{
          // resolve(data.data)
          wx.showModal({
            title: '提示',
            showCancel: false,
            confirmText: '好的',
            content: data.msg || '未请求到正确服务数据'
          })
          reject(data)
        }
        
      },
      fail(res) {
      //提示用户服务请求不通
        reject(res)
        wx.showModal({
          title: '提示',
          showCancel: false,
          confirmText: '好的',
          content: res.errMsg || '服务报错'
        })
        app.isClick = false
      },
      complete(res) {
        wx.hideLoading()
      },
    });
  })
};
