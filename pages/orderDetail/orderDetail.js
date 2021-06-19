const {orderDetail,orderBuy,buryPoint} =require('../../api/api')
const { normalTime } = require('../../utils/util');
// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 30.282195,
    longitude: 120.117858,
    markers:[],
    order_no:'',
    orderInfo:{},
    dataInfo:{},//计费规则页面
    isVipModel:false,
    polyline:[],//地图划线配置
    can_buy_text:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    buryPoint({action_type:111})
  },
  // 获取订单
  getOrderDetail(){
    var params={
      order_no:this.data.order_no
    }
    orderDetail(params).then(res=>{
      res.used_times=normalTime(res.used_time,'special')
      var polylineData=[{
        points: [{
          latitude: Number(res.borrow_lat),
          longitude: Number(res.borrow_lng)
        }],
        // color: "#ff6600",
        colorList:["#239CF3","#52E7FF"],
        width: 4,
      }]
      var markersData=[{
        id:1,
        latitude:Number(res.borrow_lat),
        longitude:Number(res.borrow_lng),
        iconPath:'/images/orderDetail/icon_borrow.png',
        zIndex:9,
        width:22,
        height:22
      }]
      console.log(polylineData)
      if(res.return_lat && res.return_lng){
        var obj={
          latitude: Number(res.return_lng),
          longitude: Number(res.return_lat)
        }
        var marObj={
          id:2,
          latitude:Number(res.return_lat),
          longitude:Number(res.return_lng),
          iconPath:'/images/orderDetail/icon_return.png',
          zIndex:9,
          width:22,
          height:22
        }
        polylineData[0].points.push(obj)
        markersData.push(marObj)
      }
      this.setData({
        latitude:res.borrow_lat,
        longitude:res.borrow_lng,
        orderInfo:res,
        dataInfo:res.rent_info,
        polyline:polylineData,
        markers:markersData,
        can_buy_text:res.can_buy_text,
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
    buryPoint({action_type:138})
    wx.showModal({
      content: this.data.can_buy_text,
      confirmText:'确定购买',
      cancelColor:'#1682FF',
      confirmColor:'#1682FF',
      success (resu) {
        if (resu.confirm) {
          var params={
            order_no:that.data.order_no
          }
          orderBuy(params).then(res=>{
            wx.showToast({
              title: '购买成功',
              icon: 'success',
              duration: 2000,
            })
          })
          that.setData({
            'orderInfo.can_buy':false
          })
        } else if (resu.cancel) {
          
        }
      }
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