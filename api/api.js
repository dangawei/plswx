let app = getApp()
import {wxRequest} from './http.js'
export const isDebug = true//正式环境
export const isTest = true//是否是测试环境登录

const newUrl = isDebug ? 'https://s-wechat.piaoliusan.com' : 'https://wapi.piaoliusan.com';

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
export const eam_policy = (data) => {//上传图片
  const params = { url:newUrl + '/eam/upload/policy', data: data }
  return wxRequest(params);
}
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
