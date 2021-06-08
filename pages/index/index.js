const { getPhone,sitePail } = require('../../api/api.js');
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    pageHeight:'',
    canIUseGetUserProfile:false,
    buyBtnText: "立即借伞",
    isVipModel:false,
    pail_no:'M700007423',
    isPhone:false
  },
  onLoad(e) {
    wx.getSystemInfo({
      success:  (res) => {
        this.setData({
          pageHeight: (750 / res.windowWidth) * res.windowHeight
        })
      }
    })
    console.log(wx.getStorageSync('phone'))
    if(!wx.getStorageSync('phone')){
      this.setData({
        isPhone:true
      })
    }
    // if (wx.getUserProfile) {
    //   this.setData({
    //     canIUseGetUserProfile: true
    //   })
    // }
    // this.getUserProfile()
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
  getPhone(e){
    console.log(e)
    
    var that=this
    if(!wx.getStorageSync('phone')){
      wx.checkSession({
        success () {
          console.log("session_key 未过期")
          //session_key 未过期，并且在本生命周期一直有效
          const params={
            encrypted_data:e.detail.details.encryptedData,
            iv:e.detail.details.iv,
            code:''
          }
          //发起网络请求
          getPhone(params).then((result) => {
            console.log(result)
            if(result.code && result.code==202){
              // that.getUserProfile()
            }else{
              that.clickBorrow()//请求借伞
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
                encrypted_data:e.detail.details.encryptedData,
                iv:e.detail.details.iv,
                code:res.code
              }
              if (res.code) {
                //发起网络请求
                getPhone(params).then((result) => {
                  this.clickBorrow()//请求借伞
                  wx.setStorage({ key: 'phone', data: result.phone })
                })
              }
            }
          })
        }
      })
    }else{
      this.clickBorrow()
    }
    
  },
  // 点击借伞
  clickBorrow(){
    console.log("点击立即借伞")
    var params={
      pail_no:this.data.pail_no
    }
    sitePail(params).then((res)=>{
      if(res.code && res.code==103){

      }else{
        wx.navigateTo({
          url: '/pages/costDetail/costDetail?pail_no='+this.data.pail_no,
        })
      }
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
  // 立即还伞
  clickReturn(){
    wx.navigateTo({
      url: '/pages/pwdReturn/pwdReturn?pail_no='+this.data.pail_no,
    })
  }
})
