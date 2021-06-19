let app = getApp()
import {wxRequest,getRequest} from './http.js'
export const isDebug = false//正式环境
export const isTest = false//是否是测试环境登录

const newUrl = isDebug ? 'https://s-wechat.piaoliusan.com' : 'https://wechat.piaoliusan.com';
const getUrl= isDebug ? 'https://s-data.piaoliusan.com/md':'https://data.piaoliusan.com/md'
const typeUrl=isDebug ? 'https://s-applet.piaoliusan.com' : 'https://applet.piaoliusan.com';

// 获取跳转小程序类型
export const getType = (data) => {
  const params = { url: typeUrl + '/v1/common/wxRoute', data }
  return wxRequest(params);
};
// 埋点
export const buryPoint=(data)=>{
  data.user_id=wx.getStorageSync('user_id') || 0
  var shop_site_id=wx.getStorageSync('shop_site_id')
  data.shop_site_id=shop_site_id && typeof shop_site_id !=undefined ? shop_site_id: 0
  const params = { url: getUrl, data }
  return getRequest(params);
}
//判断是否登录
export const userInfo = (data) => {
  const params = { url: newUrl + '/mina/user/info', data }
  return wxRequest(params);
};
//登录
export const login = (data) => {
  const params = { url: newUrl + '/mina/nologin/login', data }
  return wxRequest(params);
};
//获取解密手机号
export const getPhone = (data) => {
  const params = { url: newUrl + '/mina/user/updatePhone', data }
  return wxRequest(params);
};
export const orderUsing = (data) => {//未还订单列表
  const params = { url: newUrl + '/mina/order/using', data: data }
  return wxRequest(params);
}
export const sitePail = (data) => {//获取伞桶
  const params = { url: newUrl + '/mina/site/pail', data: data }
  return wxRequest(params);
}
export const rentInfo = (data) => {//获取计费规则
  const params = { url: newUrl + '/mina/site/rentInfo', data: data }
  return wxRequest(params);
}
export const orderBorrow = (data) => {//借伞
  const params = { url: newUrl + '/mina/order/borrow', data: data }
  return wxRequest(params);
}
export const orderBorrowStatus = (data) => {//借伞状态
  const params = { url: newUrl + '/mina/order/borrowStatus', data: data }
  return wxRequest(params);
}
export const orderReturn = (data) => {//还伞
  const params = { url: newUrl + '/mina/order/return', data: data }
  return wxRequest(params);
}
export const orderList = (data) => {//订单列表
  const params = { url: newUrl + '/mina/order/list', data: data }
  return wxRequest(params);
}
export const orderDetail = (data) => {//订单详情
  const params = { url: newUrl + '/mina/order/detail', data: data }
  return wxRequest(params);
}
export const commonStatic = (data) => {//获取静态映射
  const params = { url: newUrl + '/mina/common/static', data: data }
  return wxRequest(params);
}
export const commonPolicy = (data) => {//获取上传参数
  const params = { url: newUrl + '/mina/common/policy', data: data }
  return wxRequest(params);
}
export const userFeedback= (data) => {//用户反馈
  const params = { url: newUrl + '/mina/user/feedback', data: data }
  return wxRequest(params);
}
export const orderBuy= (data) => {//一键购买
  const params = { url: newUrl + '/mina/order/buy', data: data }
  return wxRequest(params);
}
export const getConfig= (data) => {//获取猜你想问的配置
  const params = { url: newUrl + '/mina/nologin/config', data: data }
  return wxRequest(params);
}
export const siteList= (data) => {//点位地图
  const params = { url: newUrl + '/mina/site/list', data: data }
  return wxRequest(params);
}
