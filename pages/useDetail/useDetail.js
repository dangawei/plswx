// pages/returnGuidance/returnGuidance.js
const { getConfig } = require('../../api/api.js');
let app = getApp()
Page({
  data: {
    height:wx.getStorageSync('height'),
    current:0,
    name: '',
    listData:[]
  },
  onLoad(query) {
    // 页面加载
    query.pailType = 7
    this.setData({
      pailType: query.pailType,
      current:query.current || 0
    })
    this.getConfig()
  },
  selectItem:function(e){
    const {index:current} = e.currentTarget.dataset
    // this.setData({
    //   current
    // })
    wx.navigateTo({
      url: '/pages/useDetail/useInfo/useInfo?index='+current,
    })
  },
  onReady() {
    // 页面加载完成
  },
  
  onShow() {
    // 页面显示
  },
  getConfig(){
    var params={
      key:'common_problem_new'
    }
    getConfig(params).then(res=>{
      this.setData({
        listData:res.value
      })
    })
  }
})