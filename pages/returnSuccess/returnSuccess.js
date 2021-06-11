const { buryPoint } = require('../../api/api.js');
const { normalTime } = require('../../utils/util');
// pages/returnSuccess/returnSuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:wx.getStorageSync('height'),
    dataInfo:{},
    pay:'',
    used_time:'',
    order_no:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const t=normalTime(options.used_time,'special')
    this.setData({
      order_no:options.order_no,
      used_time:t,
      pay:options.pay
    })
    
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
    buryPoint({action_type:132})
  },

  // 返回首页
  back(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },

  // 查看订单
  clickOrder(){
    wx.navigateTo({
      url: '/pages/myOrder/myOrder',
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