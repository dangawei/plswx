// pages/myOrder/myOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:wx.getStorageSync('height'),
    dataArr:[
      {
        id:1,
        name:"借伞"
      },
      {
        id:2,
        name:"会员"
      },
    ],
    bColor:"#FFC002",
    selTitle:0,//点击tab标识
    scrollyHeight:100,//可滑动高度
    reachBottom:false,
    pagenum:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      scrollyHeight: wx.getStorageSync('height')-378
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
  // 点击tab切换
  clickTitle(e){
    this.setData({
      selTitle:e.detail.currentTarget.dataset.num
    })
  },
  // 向下滑动
  scrollBottom(){
    if (!this.data.reachBottom){
      var that = this;
      var pagenum = that.data.pagenum + 1; //获取当前页数并+1
      that.setData({
        pagenum: pagenum, //更新当前页数
      })
      // that.getWorkOrderList();//重新调用请求获取下一页数据
    }
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