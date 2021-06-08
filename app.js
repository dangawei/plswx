// app.js
const { login,orderBorrowStatus } = require('./api/api.js');
App({
  onLaunch() {
    // if(!wx.getStorageSync('app_token')){
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
    // }
    wx.getSystemInfo({
      success:  (res) => {
        wx.setStorage({ key: 'height', data: (750 / res.windowWidth) * res.windowHeight })
      }
    })
  },
  onShow: function(res) {
    // 展示本地存储能力
    console.log("我进入了app.js的onshow")
    if (res.scene === 1038 || res.referrerInfo.appId =='wxd8f3793ea3b935b8') { // 场景值1038：从被打开的小程序返回,但安卓手机返回的是10001，所以只能根据appid去识别支付分的。
        console.log("我进入了返回商家小程序")
        this.globalData.userTouch =1;
        this.borrowStatus()
    }
  },
  borrowStatus(){
    console.log("请求订单状态")
    const params={
      order_no:wx.getStorageSync('order_no')
    }
    orderBorrowStatus(params).then(res=>{
      if(res.is_doing){
        this.globalData.isSuccessOrder =true;
        wx.setStorage({ key: 'borrow_code', data: res.borrow_code })
        wx.navigateTo({
          url: '/pages/pwdBorrow/pwdBorrow?borrow_code='+res.borrow_code,
        })
      }
      
    })
  },
  globalData: {
    userInfo: null,
    userTouch:0,//押金按钮显示问题
    isSuccessOrder:false,
    pail_no:'',
    order_no:'',
  }
})
