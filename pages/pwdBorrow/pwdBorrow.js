const { rentInfo } = require('../../api/api.js');
// pages/pwdBorrow/pwdBorrow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:wx.getStorageSync('height'),
    orderNumber:"20190411XXXXX12341",
    isVipModel:false,
    dataInfo:{},
    borrow_no:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      borrow_no:options.borrow_no,
      // dataInfo:wx.getStorageSync('rentInfo')
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
  //得到计费规则
  getRentInfo(){
    const params={
      pail_no:wx.getStorageSync('pail_no')
    }
    rentInfo(params).then(res=>{
      this.setData({
        dataInfo:res,
        isVipModel:true
      })
    })
  },
  // 复制
  copy(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.content,
      success: function(res) {
        wx.getClipboardData({
          success: function() {
            wx.showToast({
              title: '复制成功',
            })
          }
        })
      }
    })
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