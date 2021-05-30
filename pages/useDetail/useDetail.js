// pages/returnGuidance/returnGuidance.js
let app = getApp()
Page({
  data: {
    height:wx.getStorageSync('height'),
    current:0,
    name: '',
    listData:[
      {
        content:["方案：雨伞推入伞桩后，将伞桩上的四位还伞码输入至手机，完结订单。伞还入伞桩，但是订单未完结，您可以进入【首页／个人中心-客服中心】进行反馈，我们会第一时间解决您的问题。"],
        title:"1.伞推入伞桩后，订单未完结："
      },
      {
        content:["方案：您可以进入【首页／个人中心-客服中心】进行反馈，我们会第一时间解决您的问题。"],
        title:"2.伞推入伞桩后，还伞码未显示："
      },
      {
        content:["方案：您可以进入【首页／个人中心-客服中心】进行反馈，我们会第一时间解决您的问题。"],
        title:"2.伞推入伞桩后，还伞码未显示："
      },
      {
        content:["方案：您可以进入【首页／个人中心-客服中心】进行反馈，我们会第一时间解决您的问题。"],
        title:"2.伞推入伞桩后，还伞码未显示："
      },
      {
        content:["方案：您可以进入【首页／个人中心-客服中心】进行反馈，我们会第一时间解决您的问题。"],
        title:"2.伞推入伞桩后，还伞码未显示："
      },
      {
        content:["方案：您可以进入【首页／个人中心-客服中心】进行反馈，我们会第一时间解决您的问题。"],
        title:"2.伞推入伞桩后，还伞码未显示："
      },
      {
        content:["方案：您可以进入【首页／个人中心-客服中心】进行反馈，我们会第一时间解决您的问题。"],
        title:"2.伞推入伞桩后，还伞码未显示："
      },
      {
        content:["方案：您可以进入【首页／个人中心-客服中心】进行反馈，我们会第一时间解决您的问题。"],
        title:"2.伞推入伞桩后，还伞码未显示："
      },
    ]
  },
  onLoad(query) {
    // 页面加载
    query.pailType = 7
    this.setData({
      pailType: query.pailType,
      current:query.current || 0
    })
  },
  selectItem:function(e){
    my.pageScrollTo({scrollTop: 0})
    const {index:current} = e.target.dataset
    this.setData({
      current
    })
  },
  onReady() {
    // 页面加载完成
  },
  
  onShow() {
    // 页面显示
  }
})