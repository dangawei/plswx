const { rentInfo,orderBorrow,buryPoint } = require('../../api/api.js');
const app=getApp().globalData
// pages/costDetail/costDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:wx.getStorageSync('height'),
    pail_no:'',
    dataInfo:{},
    order_no:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      pail_no:options.pail_no
    })
    app.pail_no=options.pail_no
    wx.setStorage({ key: 'pail_no', data: options.pail_no })
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
    buryPoint({action_type:102})
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
    buryPoint({action_type:129})
    var that=this
    var params={
      pail_no:this.data.pail_no
    }
    orderBorrow(params).then(resu=>{
      console.log(resu)
      wx.navigateToMiniProgram({
        appId: 'wxd8f3793ea3b935b8',
        path: 'pages/use/use',
        extraData: {
            mch_id: resu.extraData.mch_id,
            package: resu.extraData.package,
            timestamp: resu.extraData.timestamp,
            nonce_str: resu.extraData.nonce_str,
            sign_type: resu.extraData.sign_type,
            sign: resu.extraData.sign,
            // service_id:resu.extraData.service_id,
        },
        success(res) {
            that.setData({
              order_no:resu.order_no
            })
            app.order_no=resu.order_no
            wx.setStorage({ key: 'order_no', data: resu.order_no })
        },
        fail(res) {
            //dosomething
            console.log("进入了失败函数")
            console.log(res)
            //dosomething
        },
        complete(res) {
            console.log(res)
            console.log("进入完成函数")
        }
      });
    //   wx.openBusinessView({
    //     businessType: 'wxpayScoreUse',
    //     extraData: {
    //       mch_id: res.extraData.mch_id,
    //       package: res.extraData.package,
    //       timestamp: res.extraData.timestamp,
    //       nonce_str: res.extraData.nonce_str,
    //       sign_type: res.extraData.sign_type,
    //       sign: res.extraData.sign
    //     },
    //     success(res) {
    //         //dosomething
    //         console.log(res)
    //         console.log("我进入了成功")
    //     },
    //     fail(res) {
    //         //dosomething
    //         console.log("进入了失败函数")
    //         console.log(res)
    //         //dosomething
    //     },
    //     complete(res) {
    //         //dosomething
    //         console.log(res)
    //         console.log("进入完成函数")
    //     }
    //   })
    })
  },
  // 点击协议
  clickProcotol(){
    
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