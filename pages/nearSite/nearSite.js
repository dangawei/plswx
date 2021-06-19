// pages/nearSite/nearSite.js
const {siteList,login,buryPoint}=require('../../api/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 30.282195,   // 纬度
    longitude: 120.117858, // 经度
    markers: [],
  },
  // 点击导航
  clickNav(e){
    console.log(e)
    var {item}=e.currentTarget.dataset
    wx.openLocation({
      latitude:Number(item.latitude),
      longitude:Number(item.longitude),
      name:item.shop_name,
      address:item.address,
      type:'gcj02'
    })
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
      lat:wx.getStorageSync('latitude'),
      lng:wx.getStorageSync('longitude')
    }
    siteList(params).then(res=>{
      if(res.code && res.code==202){
        this.loginIn().then(result=>{
          that.siteList()
        })
      }else{
        
        this.setData({
          markers:res
        })
      }
      
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