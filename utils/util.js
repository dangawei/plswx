isImmission
//Url 分解 返回协议 域名 端口 以及 参数
const {policy } = require('../api/api.js');

function urlSplit(url) {
  try{
    var protocolArray = url.split('//');
    var protocolStr = protocolArray[0];
    var domainStr = protocolArray[1];

   
    var pathArray = domainStr.split('/');
    var pureDomain = pathArray[0];
    var pathWithParams = pathArray[1];
    var port = pureDomain.split(':')[1];
   
    var params = pathWithParams.split('?')[1];
   
    var paramsArray = params.split('&');
    
    return {
      protocol: protocolStr,
      domainPath: domainStr,
      domain: pureDomain,
      pathParams: pathWithParams,
      port: port,
      params: paramsArray,
    }
  }catch(err){
    wx.showModal({
      title: '温馨提示',
      content: '二维码不正确',
      showCancel:false
    })
  }
}

/**
 * 判断图片大小是否大于多少MB
 */
/**
   * 满足条件将其返回(返回的是数组下标)
   */
function meetArrays(arr,max = 10) {
  let obj = {
    arrays: [],//存入满足条件的图片数组
    arr: [],//将不满足条件的数组下标保存下来
  }

  arr.findIndex(function (value, index, arr) {
    if (value.size > 1024 * 1024 * max) {
      obj.arr.push(index)
    } else {
      obj.arrays.push(value.path)
    }
  })

  return obj
}
/**
 * 点击选择图片
 */
function chooseImages(){
  return new Promise((resolve, reject) => { 
    wx.chooseImage({
      count: 9,  // 默认9
      sizeType: ['original'], // 可以指定original:原图 compressed:压缩图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        resolve(res)
      },
    })
  })
}
/**
 * 判断选择的图片是否超过限制的大小
 */
function satisfy(data,num = 10){
  let arr = []
  if (data.arrays == 0) {
    wx.showModal({
      title: `图片大小不能超过${num}MB`,
      content: `您添加的图片每张大小超过${num}MB，请重新选择添加`,
      success(res) {

      }
    })
    return
  }
  if (data.arr.length > 0) {
    for (let i = 0; i < data.arr.length; i++) {
      console.log(data.arr[i])
      arr[i] = data.arr[i] + 1
    }
  }
  if (arr.length > 0) {
    wx.showModal({
      title: `图片大小不能超过${num}MB`,
      content: `您添加的图片第${arr.join('、')}张大小超过${num}MB，请重新选择添加`,
      success(res) {

      }
    })
  }
  return data
}
/**
 * 点击预览图片
 */
function previewSign(obj, index) {
  if (obj[index].indexOf('https') != -1) {
    obj[index] = obj[index].replace('https', 'http')
  }
  wx.previewImage({
    current: obj[index], // 当前显示图片的http链接
    urls: obj, // 需要预览的图片http链接列表
    success: function (res) {

    },
  })
}

/**
 * imgArrs:需要上传的图片数组
 * index:当前数组上传的下标值
 */
function upLoadImg(imgArrs,index,callback){
  return new Promise((resolve, reject) => {
    policy({ fc: 1 }).then(res => {
      let uploadData = res;
      const uploadTask = wx.uploadFile({
        url: uploadData.auth.host, //仅为示例，非真实的接口地址
        filePath: imgArrs[index] + '',
        name: "file",
        formData: {
          key: uploadData.files[0] + "." + imgArrs[index].split(".")[imgArrs[index].split(".").length - 1],

          policy: uploadData.auth.policy,
          signature: uploadData.auth.signature,
          OSSAccessKeyId: uploadData.auth.accessid,
          success_action_status: "200",
          callback: uploadData.auth.callback,
        },
        success: res => {

          resolve(res,'uploadTask')


        },
        fail: res => {
         reject(res)
        },

      })

     

    })
  })
}

/**
 * 提示框
 */
function showModal(obj) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: obj.title || '提示',
      content: obj.content || '这是一个模态弹窗',
      showCancel: obj.showCancel || false,//是否显示取消按钮
      cancelText: obj.cancelText || '取消',//取消按钮的文字，最多 4 个字符
      cancelColor: obj.cancelColor || '#000000',//取消按钮的文字颜色 
      confirmColor: obj.confirmColor || '#1D92F2',//确认按钮的文字颜色#576B95
      confirmText: obj.confirmText || '好的',//确认按钮的文字，最多 4 个字符
      success(res) {
        resolve(res)
      }
    })
  })

}
/**
 * 重新获取地理位置授权
 */
function reauthorization(methodName) {
  wx.getSetting({
    success: (res) => {
      if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
        wx.showModal({
          title: '是否授权当前位置',
          content: '需要获取您的地理位置，请确认授权!',
          success: res => {
            if (res.cancel) {
              console.info("1授权失败返回数据");
            } else if (res.confirm) {
              wx.openSetting({
                success:  data => {
                  if (data.authSetting["scope.userLocation"] == true) {
                    wx.showToast({
                      title: '授权成功',
                      icon: 'success',
                      duration: 2000
                    })
                    //再次授权，调用getLocationt的API
                  
                    setAddress()
                  } else {
                    wx.showToast({
                      title: '授权失败',
                      icon: 'success',
                      duration: 2000
                    })

                  }

                }

              })
            }
          }
        })
      } else if (res.authSetting['scope.userLocation'] == undefined) {//初始化进入
        setAddress()
      }

    }
  })
}
/**
   * 获取地址以及经纬度
   */
function setAddress() {
  //可以通过经纬度获取地址
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.chooseLocation({
          latitude: latitude,
          longitude: longitude,
          success: (result) =>{
            resolve(result)
          },
        });
      },
      fail:() => {
        reauthorization()
      }
    })
  })

}
/**
 * data1:表示需要监测的属性
 * data2:表示需要检测是否有值
 * 查看是否有值为空
 */
function isImmission(data1,data2) {
  for (let key in data1) {
    if (!data2[key]) {
      return key
    }
  }
 
}

/**
 * 数组遍历
 */
function traverse(data,type,obj){
  for (let key in data){
    obj[type + '[' + key+ ']'] = data[key]
  }
}

/**
 * 将数组循环添加到某个字段上
 * type:字段名称
 * obj:将字段添加到对象上
 * data:需要循环的数据
 * flag:数组中是否是对象
 */

function circulation(type,obj,data,flag){
    for(let i = 0; i < data.length;i++){
      if(flag){
        traverse(data[i], type + '[' + i + ']',obj)
      }else{
        obj[type + '[' + i + ']'] = data[i]
      }
    }
   return obj
}
/**
 * 如果是直辖市，将直辖市二级数据补齐变成三级数据
 */
function polishing_data(res) {
  res.find((item, index) => {
    if (item.id == 1 || item.id == 18 || item.id == 791 || item.id == 2233) {
      let value = {}
      let child = item
      for (let key in item) {
        if (key == 'child') {
          value[key] = []
          value[key].push(item)
        } else {
          value[key] = item[key]
        }
      }
      res[index] = value
    }
  })

  return res
}

/**
 * 时间转换，兼容安卓系统和ios系统
 */
function transfer_time(time){
  let time_ios = ''
  if(time.indexOf('.') > -1){
    time_ios = time.replace(/\./g, "/")
  }else{
    time_ios = time.replace(/\-/g, "/")
  }
  return new Date(time_ios).getTime() || new Date(time).getTime()
}

// 时间
const normalTime = (time, type) => {
  // hour:h ;minutes:m
  if (time) {
    let result
    time = time * 1000
    if (time < 0) return;
    let d = parseInt(time / 60 / 60 / 1000 / 24);
    let h = parseInt(time % (3600000 * 24) / 60 / 60 / 1000);
    let m = Math.ceil((time % (3600000)) / 1000 / 60);
    m = m ? m : 1;
    if(m==60){
      h=h+1
      m=0
    }
    if(h==24){
      d=d+1
      h=0
    }
    switch (type) {
      case 'special':
        if(d==0 && h!=0){
          result = [{
            time: h,
            title: '小时'
          }, {
            time: m,
            title: '分钟'
          }]
        }else if(d==0 && h==0){
          result = [{
            time: m,
            title: '分钟'
          }]
        }else{
          result = [{
            time: d,
            title: '天'
          }, {
            time: h,
            title: '小时'
          }, {
            time: m,
            title: '分钟'
          }]
        }
        break;
      case 'day':
        if(d==0 && h!=0){
          result = `${h}小时${m}分钟`
        }else if(d==0 && h==0){
          result = `${m}分钟`
        }else{
          result = `${d}天${h}小时${m}分钟`
        }
        break;
      default:
        result = `${d}天${h}小时${m}分钟`
    }
    return result;
  }
}
module.exports = {
  urlSplit,
  meetArrays,
  chooseImages,
  satisfy,
  previewSign,
  showModal,
  reauthorization,
  setAddress,
  isImmission,
  upLoadImg,
  circulation,
  polishing_data,
  transfer_time,
  normalTime
}