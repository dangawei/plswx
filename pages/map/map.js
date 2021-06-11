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
    markers: [{
      id: 1,
      latitude:30.282195,
      longitude: 120.117858,
      name: '莱茵达',
      iconPath:'/images/map/marker_icon.png',
      width:26,
      height:33
    }],
    scale: 15, // 缩放
    timeoutId: null,
    mapSetting: {},
    buryNum:9,//埋点标识
    siteShow:false,
    markerSite:{
      address: "杭州市西湖区华星路96号",
      borrow_count: 0,
      businesstime: "9:00-17:00",
      distance: "453.9m",
      height: 33,
      iconPath: "/images/map/marker_icon.png",
      id: 9993,
      latitude: "30.279203",
      longitude: "120.121071",
      return_count: 20,
      shop_name: "互联网金融大厦B",
      width: 26
    },//点击伞点marker
    isClickMarker:false,//是否点击marker
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.siteList()
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
  // 登录
  loginIn(){
    console.log(321)
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
  siteList(){
    var that=this
    var params={
      lat:this.data.latitude,
      lng:this.data.longitude
    }
    siteList(params).then(res=>{
      if(res.code && res.code==202){
        this.loginIn().then(result=>{
          that.siteList()
        })
      }else{
        res.forEach(ele => {
          ele.id=Number(ele.id)
          ele.iconPath='/images/map/marker_icon.png'
          ele.width=26,
          ele.height=33
        });
        this.setData({
          markers:res
        })
      }
      
    })
  },
  // 点击点位标记点
  clickMarker(e){
    this.data.isClickMarker=true
    var that=this
    setTimeout(function(){
      that.data.isClickMarker=false
    },600)
    for(let i=0,len=this.data.markers.length;i<len;i++){
      if(e.detail.markerId==this.data.markers[i].id){
        this.setData({
          markerSite:this.data.markers[i],
          siteShow:true
        })
        break
      }
    }
    console.log()
  },
  // 隐藏点位标记点弹窗
  hideSiteShow(){
    this.setData({
      siteShow:false
    })
  },
  // 点击地图poi
  poitap(e){
    var that=this
    setTimeout(function(){
      if(!that.data.isClickMarker){
        that.setData({
          siteShow:false
        })
      }
    },300)
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