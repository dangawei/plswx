const { rentInfo } = require('../../api/api.js');
// pages/costDetail/costDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:wx.getStorageSync('height'),
    pail_no:'',
    dataInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pail_no:options.pail_no
    })
    this.getRentInfo()
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
      pail_no:this.data.pail_no
    }
    rentInfo(params).then(res=>{
      console.log(res)
      this.setData({
        dataInfo:res
      })
      wx.setStorage({ key: 'rentInfo', data: res })
    })
  },
  // 确定借伞
  clickBorrow(){
    
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