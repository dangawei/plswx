// app.js
const { login,orderBorrowStatus } = require('./api/api.js');
App({
  onLaunch(options) {
    // if(!wx.getStorageSync('app_token')){
      // wx.login({
      //   success (res) {
      //     if (res.code) {
      //       //发起网络请求
      //       login({ code: res.code }).then((result) => {
      //         console.log(result)
      //         wx.setStorage({ key: 'code', data: res.code })
      //         wx.setStorage({ key: 'app_token', data: result.app_token })
      //         wx.setStorage({ key: 'show_id', data: result.show_id })
      //         wx.setStorage({ key: 'user_id', data: result.user_id })
      //       })
      //       console.log(options)
      //     } else {
      //       console.log('登录失败！' + res.errMsg)
      //     }
      //   }
      // })
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
    const params={
      order_no:wx.getStorageSync('order_no')
    }
    orderBorrowStatus(params).then(res=>{
      if(res.is_doing){
        this.globalData.isSuccessOrder =true;
        wx.setStorage({ key: 'borrow_code', data: res.borrow_code })
        wx.setStorage({ key: 'borrow_time', data: res.borrow_time })
        var borrow_step=wx.getStorageSync('borrow_step')
        if(!borrow_step){
          wx.navigateTo({
            url: '/pages/useStep/useStep?pail_no='+wx.getStorageSync('pail_no')+'&type=1&borrow_code='+res.borrow_code+'&order_no='+res.order_no,
          })
        }else{
          wx.navigateTo({
            url: '/pages/pwdBorrow/pwdBorrow?pail_no='+wx.getStorageSync('pail_no')+'&borrow_code='+res.borrow_code+'&order_no='+res.order_no,
          })
        }
      }else{
        wx.showToast({
          title: '授权不成功,暂无法借伞',
          icon: 'success',
          duration: 3000,
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
