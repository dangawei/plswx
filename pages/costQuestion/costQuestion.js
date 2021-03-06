// pages/costQuestion/costQuestion.js
const { orderDetail } = require('../../api/api.js');
const { normalTime } = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.order_no){
      this.getOrderDetail(options.order_no)
    }else{
      this.setData({
        details:wx.getStorageSync('orderDetail')
      })
    }
  },
  // 问题反馈
  gobf(){
    wx.navigateTo({
      url: '/pages/brfeedback/brfeedback',
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

  },

  // 获取订单
  getOrderDetail(e){
    var params={
      order_no:e
    }
    orderDetail(params).then(res=>{
      res.used_times=normalTime(res.used_time,'special')
      this.setData({
        details:res
      })
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