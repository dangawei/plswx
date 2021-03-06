const { orderUsing,orderReturn,buryPoint } = require('../../api/api.js');
// pages/pwdReturn/pwdReturn.js
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
    listModelShow:false,
    order_no:'',
    pail_no:'',
    codeNum:1,
    isCode:true,
    valueLength:4,//还伞码长度
    isReturn:false,//是否有可还雨伞
    position:'right',
    listOrder:[],//可还雨伞列表
    current:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options.pail_no='M700007423'//todo
    this.setData({
      pail_no:options.pail_no
    })
    this.getOrderUsing()
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
    buryPoint({action_type:107})
  },
  // 点击如何借还伞
  howBR(){
    wx.navigateTo({
      url: '/pages/useDetail/useInfo/useInfo',
    })
  },
  // 未还订单列表
  getOrderUsing(){
    orderUsing().then(res=>{
      if(res.length>1){
        this.setData({
          listOrder:res,
          listModelShow:true,
          isReturn:true
        })
        wx.setStorageSync('return_num', res.length)
      }else if(res.length==1){
        this.setData({
          order_no:res[0].order_no,
          isReturn:true
        })
        wx.setStorageSync('return_num', res.length)
      }else{
        this.setData({
          isReturn:false
        })
      }
    })
  },
  // 选择要还的雨伞
  handleChange({ detail = {} }){
    this.setData({
        current: detail.value,
        order_no:detail.value
    });
  },
  // 选择确定要还的雨伞
  sureSecelt(){
    if(this.data.current){
      this.setData({
        listModelShow:false
      })
    }else{
      wx.showToast({
        title: '请选择要还的订单',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 确定还伞
  sureReturn(e){
    var that=this
    var params={
      order_no:this.data.order_no,
      pail_no:this.data.pail_no,
      return_code:e.detail.value
    }
    orderReturn(params).then(res=>{
      if(res && res.code==104){
        this.setData({
          codeNum:3
        })
        console.log(this.data.codeNum)
      }else{
        wx.reLaunch({
          url: '/pages/returnSuccess/returnSuccess?pay='+res.payment_amount+'&used_time='+res.used_time+'&order_no='+this.data.order_no,
        })
      }
    })
  },
  // 光标位置
  focusIndex(e){
    if(e.detail.value!=this.data.valueLength){
      this.setData({
        codeNum:1
      })
    }
  },
  // 点击快速反馈
  clickfb(){
    wx.navigateTo({
      url: '/pages/opfeedback/opfeedback?type=2&order_no='+this.data.order_no+'&pail_no='+this.data.pail_no,
    })
  },
  // 返回首页
  back(){
    wx.reLaunch({
      url: '/pages/index/index',
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