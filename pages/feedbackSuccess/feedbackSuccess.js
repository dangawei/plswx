// pages/feedbackSuccess/feedbackSuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_no:'',
    type:1,//1借伞,2还伞,
    isContinue:false,//是否继续还伞
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_no:options.order_no,
      type:options.type
    })
    if(options.type==2){
      var return_num=wx.getStorageSync('return_num')
      if(return_num && return_num>=2){
        this.setData({
          isContinue:true
        })
      }else{
        this.setData({
          isContinue:false
        })
      }
    }
    
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
  // 查看订单
  goOrder(){
    wx.navigateTo({
      url: '/pages/myOrder/myOrder',
    })
  },
  // 返回首页
  back(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  // 继续还伞
  goReturn(){
    wx.navigateTo({
      url: '/pages/pwdReturn/pwdReturn?pail_no='+wx.getStorageSync('pail_no'),
    })
  },
  // 费用疑问
  goCostQues(){
    wx.navigateTo({
      url: '/pages/costQuestion/costQuestion?order_no='+this.data.order_no,
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