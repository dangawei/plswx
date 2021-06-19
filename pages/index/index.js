const { getPhone,sitePail,buryPoint,getType,login,userInfo } = require('../../api/api.js');
const urlUtil = require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    pageHeight:'',
    canIUseGetUserProfile:false,
    buyBtnText: "立即借伞",
    isVipModel:false,
    pail_no:'M700014823',
    isPhone:false,
    isBandSite:false,//伞点维修弹窗
    showModal:false,
    last_order_no:'',
    last_borrow_code:'',
    route_type:0,//1本小程序,2去支付宝小程序,3跳别的小程序
    isClick:false,//是否点击按钮
    appId:'',//禁毒小程序appid
    path:'',//禁毒小程序路径
  },
  onLoad(options) {
    // wx.removeStorage({
    //   key: 'phone',
    //   success (res) {
    //   }
    // })
    // wx.removeStorage({
    //   key: 'app_token',
    //   success (res) {
    //   }
    // })
    // options.pail_no="M700014823" //todo 1
    // options.pail_no="M700044877" //todo 2
    // options.pail_no="M700075190" //todo 3
    // options.q="https://scan.piaoliusan.com/borrow?id=M700121152&t=7" //todo 禁毒
    if (options.q) {
      let scan_url = decodeURIComponent(options.q);
      //获取关联普通二维码的码值，放到全局变量qrCode中
    
      app.qrCode = scan_url;
      const codes=urlUtil.urlSplit(app.qrCode)
      this.setData({
        pail_no:codes.params.id
      })
      wx.setStorageSync('pail_no', codes.params.id)
    }else if(options.pail_no){//从map页面进入
      this.setData({
        pail_no:options.pail_no
      })
      wx.setStorageSync('pail_no', options.pail_no)
    }else{
      this.setData({
        pail_no:wx.getStorageSync('pail_no')
      })
    }
    this.getType()
    console.log(this.data.pail_no)
    wx.getSystemInfo({
      success:  (res) => {
        this.setData({
          pageHeight: (750 / res.windowWidth) * res.windowHeight
        })
      }
    })
    
    if(!wx.getStorageSync('phone')){
      this.setData({
        isPhone:true
      })
    }
    this.userInfo()
  },
  onShow: function () {
    buryPoint({action_type:101})
  },
  // 获取用户是否登录
  userInfo(){
    userInfo().then(res=>{
      if(res.code && res.code==202){
        this.loginIn()
      }
    })
  },
  // 登录
  loginIn(){
    return new Promise((resolve, reject) =>{
      wx.login({
        success (res) {
          if (res.code) {
            
              login({ code: res.code }).then((result) => {
                wx.setStorage({ key: 'code', data: res.code })
                wx.setStorage({ key: 'app_token', data: result.app_token })
                wx.setStorage({ key: 'show_id', data: result.show_id })
                wx.setStorage({ key: 'user_id', data: result.user_id })
                resolve(result)
              })
          }
        }
      })
    })
    
  },
  // 获取小程序跳转类型
  getType(){
    var params={
      pail_no:this.data.pail_no
    }
    getType(params).then(res=>{
      // console.log(res)
      this.setData({
        route_type:res.route_type,
        appId: res.app_id,
        path: res.home_url,
      })
      wx.setNavigationBarTitle({
        title: res.title
      })
    })
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
    if(this.data.isClick) return
    this.data.isClick=true
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
            that.data.isClick=false
            that.clickBorrow()//请求借伞
            wx.setStorage({ key: 'phone', data: result.phone })
          })
        },
        fail () {
          
          // session_key 已经失效，需要重新执行登录流程
          console.log("session_key 已过期")
          wx.login({
            success (res) {
              console.log(2)
              const params={
                encrypted_data:e.detail.details.encryptedData,
                iv:e.detail.details.iv,
                code:res.code
              }
              if (res.code) {
                //发起网络请求
                getPhone(params).then((result) => {
                  that.data.isClick=false
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
    buryPoint({action_type:111})
    var params={
      pail_no:this.data.pail_no
    }
    sitePail(params).then((res)=>{
      this.data.isClick=false
      if(res.code && res.code==103){
        this.setData({
          isBandSite:true
        })
      }else if(res.code && res.code==202){
        this.loginIn().then(r=>{
          this.clickBorrow()
        })
      }else{
        wx.setStorage({ key: 'shop_site_id', data: res.shop_site_id })
        if(res.last_borrow_code){
          this.setData({
            showModal:true,
            last_borrow_code:res.last_borrow_code,
            last_order_no:res.last_order_no
          })
          wx.setStorage({ key: 'borrow_time', data: res.last_borrow_time })
        }else{
          wx.navigateTo({
            url: '/pages/costDetail/costDetail?pail_no='+this.data.pail_no,
          })
        }
        
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
  // 关闭伞点维修弹窗
  hideBandSite(){
    this.setData({
      isBandSite:false
    })
  },
  // 点击展示附近伞点按钮
  backMap(){

  },
  // 15分钟内借伞码弹窗

  // 关闭15分钟内借伞码弹窗
  hideModal(){
    this.setData({
      showModal:false
    })
  },
  //继续借伞
  continueBorrow(){
    wx.reLaunch({
      url: '/pages/costDetail/costDetail?pail_no='+this.data.pail_no,
    })
  },
  //获取上次传伞码
  getBorrowCode(){
    wx.reLaunch({
      url: '/pages/pwdBorrow/pwdBorrow?pail_no='+this.data.pail_no+'&borrow_code='+this.data.last_borrow_code+'&order_no='+this.data.last_order_no,
    })
  },
  // 立即还伞
  clickReturn(){
    buryPoint({action_type:128})
    var return_step=wx.getStorageSync('return_step')
    if(!return_step){
      wx.navigateTo({
        url: '/pages/useStep/useStep?pail_no='+this.data.pail_no+'&type=2',
      })
    }else{
      wx.navigateTo({
        url: '/pages/pwdReturn/pwdReturn?pail_no='+this.data.pail_no,
      })
    }
    
  },
  // 查看订单
  clickOrder(){
    wx.navigateTo({
      url: '/pages/myOrder/myOrder',
    })
  },
  // 点击使用说明
  clickUse(){
    wx.navigateTo({
      url: '/pages/useDetail/useInfo/useInfo',
    })
  },
  // 个人中心
  goMy(){
    wx.navigateTo({
      url: '/pages/my/my',
    })
  },
  // 去地图页
  backMap(){
    wx.reLaunch({
      url: '/pages/map/map',
    })
  },
  //点击去别的小程序
  go(){
    wx.navigateToMiniProgram({
      appId: this.data.appId,
      path: this.data.path,
      extraData: {
        pail_no: this.data.pail_no
      }
    })
  }
})
