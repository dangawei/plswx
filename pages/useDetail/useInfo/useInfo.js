// pages/useDetail/useInfo/useInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArr:[
      {
        id:1,
        name:"借伞流程"
      },
      {
        id:2,
        name:"还伞流程"
      },
      {
        id:3,
        name:"如何购买"
      },
    ],
    bColor:"#FFC002",
    selTitle:0,//点击tab标识
    borrowData:[
      {
        icon:'/images/1.png',
        title:'打开微信“mobrella”小程序查看附近伞点。',
        img:'/images/useInfo/pic_step1@2x.png'
      },
      {
        icon:'/images/2.png',
        title:'打开微信扫一扫借伞码，获取借伞码。',
        img:'/images/useInfo/pic_step2@2x.png'
      },
      {
        icon:'/images/3.png',
        title:'在伞桩上输入借伞码。',
        img:'/images/useInfo/pic_step3@2x.png'
      },
      {
        icon:'/images/4.png',
        title:'30s内将伞从左边的取伞口取出，借伞完成。',
        img:'/images/useInfo/pic_step4@2x.png'
      },
    ],
    returnData:[
      {
        icon:'/images/1.png',
        title:'打开微信“mobrella”小程序查看附近伞点。',
        img:'/images/useInfo/pic_step1@2x.png'
      },
      {
        icon:'/images/2.png',
        title:'打开微信扫一扫还伞码，根据页面提示操作。',
        img:'/images/useInfo/pic_step2@2x.png'
      },
      {
        icon:'/images/3.png',
        title:'将伞收好，从左边还伞口推进去。',
        img:'/images/useInfo/pic_step3@2x.png'
      },
      {
        icon:'/images/4.png',
        title:'将伞桩上的还伞码输入到手机，结束订单。',
        img:'/images/useInfo/pic_step4@2x.png'
      },
    ]
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
  // 
  clickTitle(e){
    this.setData({
      selTitle:e.detail.currentTarget.dataset.num
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