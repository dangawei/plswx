// pages/pwdBorrow/pwdBorrow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:wx.getStorageSync('height'),
    orderNumber:"20190411XXXXX12341",
    isVipModel:false,
    dataInfo:{
      beyond_deposit:"订单大于押金时，订单自动结束计费扣除押金作为租赁费用",
      cost:"0.01元/小时",
      deposit:"0.01元",
      free_deposit:"芝麻信用分满550分免0.01元押金（以支付宝的返回结果为准）",
      is_deny_borrow:false,
      suitable:""
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  // 点击如何借还伞
  howBR(){
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