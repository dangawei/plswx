const {orderDetail,orderBuy} =require('../../api/api')
const { normalTime } = require('../../utils/util');
// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers:[],
    order_no:'',
    orderInfo:{},
    dataInfo:{},//计费规则页面
    isVipModel:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      height: 20,
      width: 17,
      iconPath: "/images/orderDetail/icon_borrow.png",
      latitude: '30.275909',
      longitude: '120.124039',
    })
    this.setData({
      order_no:options.order_no
    })
    this.getOrderDetail()
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
  getOrderDetail(){
    var params={
      order_no:this.data.order_no
    }
    orderDetail(params).then(res=>{
      res.used_times=normalTime(res.used_time,'special')
      this.setData({
        orderInfo:res,
        dataInfo:res.rent_info
      })
      wx.setStorageSync('orderDetail', res)
    })
  },
  // 显示计费规则
  clickRent(){
    this.setData({
      isVipModel:true
    })
  },
  // 关闭弹窗
  hideVip(e){
    this.setData({
      isVipModel:false
    })
  },
  // 费用疑问
  goCostQues(){
    wx.navigateTo({
      url: '/pages/costQuestion/costQuestion?order_no='+this.data.order_no,
    })
  },
  // 意见反馈
  brdf(){
    wx.navigateTo({
      url: '/pages/brfeedback/brfeedback',
    })
  },
  // 一键购买
  clickBuy(){
    var that=this
    var params={
      order_no:this.data.order_no
    }
    orderBuy(params).then(res=>{
      wx.showToast({
        title: '购买成功',
        icon: 'success',
        duration: 2000,
        // success:function(){
        //   that.getOrderDetail()
        // }
      })
    })
    this.setData({
      'orderInfo.can_buy':false
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