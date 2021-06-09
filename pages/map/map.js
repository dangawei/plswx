// pages/map/map.js
const {siteList}=require('../../api/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:wx.getStorageSync('height'),
    latitude: 22.534777,   // 纬度
    longitude: 114.022583, // 经度
    markers: [{
      id: 1,
      latitude:22.534777,
      longitude: 114.022583,
      name: '莱茵达'
    }],
    scale: 15, // 缩放
    timeoutId: null,
    markers: [],
    mapSetting: {},
    buryNum:9,//埋点标识
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.siteList()
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
  // 获取点位地图
  siteList(){
    var params={
      lat:this.data.latitude,
      lng:this.data.longitude
    }
    siteList(params).then(res=>{

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