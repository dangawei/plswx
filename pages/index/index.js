const { login,getPhone } = require('../../api/api.js');
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    pageHeight:'',
    canIUseGetUserProfile:false,
    buyBtnText: "立即借伞",
    isVipModel:false
  },
  onLoad() {
    wx.getSystemInfo({
      success:  (res) => {
        this.setData({
          pageHeight: (750 / res.windowWidth) * res.windowHeight
        })
      }
    })
    // if (wx.getUserProfile) {
    //   this.setData({
    //     canIUseGetUserProfile: true
    //   })
    // }
    
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.setStorage({ key: 'userInfo', data: res.userInfo })
        
      },
      fail: (res) => {
        console.log("获取失败")
        wx.showToast({
          title: '获取失败',
          icon: 'error',
          duration: 2000
        })
      },
    })
  },
  // 获取手机号
  bindgetphonenumber(e){
    console.log(e)
    console.log(e.detail)
    var that=this
    wx.checkSession({
      success () {
        console.log("session_key 未过期")
        //session_key 未过期，并且在本生命周期一直有效
        const params={
          encrypted_data:e.detail.encryptedData,
          iv:e.detail.iv,
          code:''
        }
        //发起网络请求
        getPhone(params).then((result) => {
          console.log(result)
          if(result.code && result.code==202){
            that.getUserProfile()
          }else{
            wx.setStorage({ key: 'phone', data: result.phone })
          }
        })
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        console.log("session_key 已过期")
        wx.login({
          success (res) {
            const params={
              encrypted_data:e.detail.encryptedData,
              iv:e.detail.iv,
              code:res.code
            }
            if (res.code) {
              //发起网络请求
              getPhone(params).then((result) => {
                wx.setStorage({ key: 'phone', data: result.phone })
              })
            }
          }
        })
      }
    })
  },
  // 点击借伞
  clickBorrow(){
    this.setData({
      isVipModel:true
    })
  },
  // 关闭弹窗
  hideVip(e){
    console.log("关闭")
    this.setData({
      isVipModel:false
    })
  },
  //继续借伞
  continueBorrow(){
    console.log("继续借伞")
  },
  //获取上次传伞码
  getBorrowCode(){
    console.log("获取上次传伞码")
  },
  // 获取用户信息
  // getUserInfo:function(res){
  //   console.log(res.detail)
  //   // console.log(app.code)
  //   var that = this
    
  //   // if(wx.getStorageSync("getUserInfo")){
  //   //   console.log('aaaa')
  //   // }else{
  //   //   console.log(res.detail.errMsg.indexOf("ok"))
  //     // if (res.detail.errMsg.indexOf("ok")>0){
  //     //   wx.setStorageSync("getUserInfo", res.detail.userInfo)
  //     //   wx.setStorageSync("encryptedData", res.detail.encryptedData)
  //     //   wx.setStorageSync("iv", res.detail.iv)
        
  //       wx.getUserInfo({
  //         success: function(sys) {
  //           console.log(sys)
  //           // newapi.login({
  //           //   method: 'POST',
  //           //   data: {
  //           //     code: app.code,
  //           //     encryptedData: res.detail.encryptedData,
  //           //     iv: res.detail.iv,
  //           //     model: sys.model,
  //           //     system: sys.system,
  //           //     platform: sys.platform,
  //           //     sdkversion: sys.SDKVersion
  //           //   },
  //           //   success: function (result) {
  //           //     console.log(result)
  //           //     if (result.data.code == "0") {
  //           //       wx.setStorageSync("s_token", result.data.data.s_token)

  //           //       // wx.getStorageSync("getUserInfo")
  //           //       if (!result.data.data.phone) {
  //           //         that.setData({
  //           //           userIphone: true
  //           //         })
  //           //       } else {
  //           //         // pail_no = "pls00000000003"
  //           //         wx.setStorageSync("getUserInfo", res.detail.userInfo)
  //           //         if (that.data.types == 0) {
  //           //           wx.reLaunch({
  //           //             url: '../map/index',
  //           //           })
  //           //           return
  //           //         }
  //           //         wx.navigateTo({
  //           //           url: '../pice/pice?pail_no=' + that.data.pail_no
  //           //         })
  //           //       }
  //           //     }
  //           //   }
  //           // })
  //         },
  //       })
  //     // }else{
  //     //   wx.showModal({
  //     //     title: '温馨提醒 ~',
  //     //     content: '授权过后，才能借伞哦 ~',
  //     //   })
  //     // }
  //   // }
  // },
})
