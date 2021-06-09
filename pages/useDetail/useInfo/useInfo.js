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
    selTitle:'0',//点击tab标识
    borrowData:[
      {
        icon:'/images/1.png',
        title:'打开微信“mobrella”小程序查看附近伞点。',
        img:'https://pls-wechat.piaoliusan.com/wechat/useInfo/pic_step1.png'
      },
      {
        icon:'/images/2.png',
        title:'打开微信扫一扫借伞码，获取借伞码。',
        img:'https://pls-wechat.piaoliusan.com/wechat/useInfo/pic_step2.png'
      },
      {
        icon:'/images/3.png',
        title:'在伞桩上输入借伞码。',
        img:'https://pls-wechat.piaoliusan.com/wechat/useInfo/pic_step3.png'
      },
      {
        icon:'/images/4.png',
        title:'30s内将伞从左边的取伞口取出，借伞完成。',
        img:'https://pls-wechat.piaoliusan.com/wechat/useInfo/pic_step4.png'
      },
    ],
    returnData:[
      {
        icon:'/images/1.png',
        title:'打开微信“mobrella”小程序查看附近伞点。',
        img:'https://pls-wechat.piaoliusan.com/wechat/useInfo/hs1.png'
      },
      {
        icon:'/images/2.png',
        title:'打开微信扫一扫还伞码，根据页面提示操作。',
        img:'https://pls-wechat.piaoliusan.com/wechat/useInfo/hs2.png'
      },
      {
        icon:'/images/3.png',
        title:'将伞收好，从左边还伞口推进去。',
        img:'https://pls-wechat.piaoliusan.com/wechat/useInfo/hs3.png'
      },
      {
        icon:'/images/4.png',
        title:'将伞桩上的还伞码输入到手机，结束订单。',
        img:'https://pls-wechat.piaoliusan.com/wechat/useInfo/hs4.png'
      },
    ],
    buyData:[
      {
        icon:'/images/1.png',
        title:'打开个人中心，“我的订单” 页面点击未还订单。',
        img:'https://pls-wechat.piaoliusan.com/wechat/useInfo/buy1.png'
      },
      {
        icon:'/images/2.png',
        title:'进入未还详情页面点 击“一键购买”按钮。',
        img:'https://pls-wechat.piaoliusan.com/wechat/useInfo/buy2.png'
      },
      {
        icon:'/images/3.png',
        title:'点击“确认购伞”按钮 完成购买。',
        img:'https://pls-wechat.piaoliusan.com/wechat/useInfo/buy3.png'
      },
      {
        icon:'/images/4.png',
        title:'进入购伞成功页面，即 代表操作成功，订单已 完结。',
        img:'https://pls-wechat.piaoliusan.com/wechat/useInfo/buy4.png'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.index){
      this.setData({
        selTitle:options.index
      })
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