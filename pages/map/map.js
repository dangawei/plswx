// pages/map/map.js
const {siteList,login,buryPoint}=require('../../api/api')
const urlUtil = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:wx.getStorageSync('height'),
    latitude: 30.282195,   // 纬度
    longitude: 120.117858, // 经度
    markers: [],
    scale: 15, // 缩放
    timeoutId: null,
    mapSetting: {},
    buryNum:9,//埋点标识
    siteShow:false,
    markerSite:{},//点击伞点marker
    isClickMarker:false,//是否点击marker
    initSite:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation();
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    buryPoint({action_type:109})
  },
  // 获取位置
  getLocation(){
    var that=this
    wx.getLocation({
      type: 'gcj02',
      success (res) {
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude
        })
        wx.setStorageSync('latitude', res.latitude)
        wx.setStorageSync('longitude', res.longitude)
        
        that.siteList(res.latitude,res.longitude)
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
  // 获取点位地图
  siteList(lat,lng){
    var that=this
    var params={
      lat:lat,
      lng:lng
    }
    siteList(params).then(res=>{
      if(res.code && res.code==202){
        this.loginIn().then(result=>{
          that.siteList(lat,lng)
        })
      }else{
        if(Object.keys(res).length>0){
          res.forEach(ele => {
            ele.id=Number(ele.id)
            ele.iconPath='https://pls-wechat.piaoliusan.com/wechat/map/marker_icon.png'
            ele.width=26,
            ele.height=33
          });
          
          this.setData({
            // markers:this.data.markers.concat(res)
            markers:res,
            initSite:false
          })
        }
        
      }
      
    })
  },
  // 视野发生改变时触发
  regionchange(e){
    if(this.data.initSite) return
    if(e.type=='end'){
      
      const {latitude,longitude}=e.detail.centerLocation
      this.siteList(latitude,longitude)
    }
  },
  // 点击点位标记点
  clickMarker(e){
    if(e.detail.markerId!=0){
      this.data.isClickMarker=true
      var that=this
      setTimeout(function(){
        that.data.isClickMarker=false
      },150)
      for(let i=0,len=this.data.markers.length;i<len;i++){
        if(e.detail.markerId==this.data.markers[i].id){
          this.setData({
            markerSite:this.data.markers[i],
            siteShow:true
          })
          break
        }
      }
    }
  },
  // 隐藏点位标记点弹窗
  hideSiteShow(){
    this.setData({
      siteShow:false
    })
  },
  // 点击地图空白
  poitap(e){
    var that=this
    setTimeout(function(){
      if(!that.data.isClickMarker){
        that.setData({
          siteShow:false
        })
      }
    },100)
  },
  // 点击个人中心
  goMy(e){
    wx.navigateTo({
      url: '/pages/my/my',
    })
  },
  // 点击导航
  clickNav(){
    wx.openLocation({
      latitude:Number(this.data.markerSite.latitude),
      longitude:Number(this.data.markerSite.longitude),
      name:this.data.markerSite.shop_name,
      address:this.data.markerSite.address,
      type:'gcj02'
    })
  },
  // 点击扫码借还伞
  clickCyan(){
    wx.scanCode({
      onlyFromCamera: true,
      success (res) {
        const result = res.result
        const codes=urlUtil.urlSplit(result)
        console.log(codes)
        console.log(codes.params.id)
        wx.navigateTo({
          url: '/pages/index/index?pail_no='+codes.params.id,
        })
        wx.setStorageSync('pail_no', codes.params.id)
      }
    })
  },
  //重置定位
  resetPosition(){
    this.getLocation()
  },
  // 跳转使用说明
  goUseInfo(){
    wx.navigateTo({
      url: '/pages/useDetail/useDetail',
    })
  },
  // 附近伞点
  goNav(){
    wx.navigateTo({
      url: '/pages/nearSite/nearSite',
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})