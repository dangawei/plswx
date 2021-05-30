// pages/brfeedback/brfeedback.js
const { previewSign, chooseImages, meetArrays, satisfy} = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:wx.getStorageSync('height'),
    isHiddeTip:true,
    isShow:true,
    picture:[],//上传的图片
    pictureLength:0,
    picID:[],
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
  /**
   * 通过判断data-type值给相对应的模块添加照片
   */
  chooseImage(e) {
    let sign = e.currentTarget.dataset.type;
    let signLeng=sign+'Length'
    if(this.data[signLeng]>3){
      wx.showToast({
        icon:'none',
        title: '最多上传三张图片',
        duration: 2000
      })
    }else{
      chooseImages().then(res =>{
        console.log(res)
        let isdelArray = meetArrays(res.tempFiles)//不能大于10MB
        isdelArray = satisfy(isdelArray)
        let images = this.data[sign].concat(isdelArray.arrays)
        if(images.length>3){
          wx.showToast({
            icon:'none',
            title: '最多上传三张图片',
            duration: 2000
          })
        }else{
          this.setData({
            [sign]: images,
            [signLeng]:images.length
          })
        }
        
      })
    }
  },
  /**
   * 通过判断data-type值预览当前模块中点击的照片
   */
  previewImage: function (e) {
    const index = e.currentTarget.dataset.index;
    const sign = e.currentTarget.dataset.type;
    if (this.data[sign].length > 0) {
      previewSign(this.data[sign], index)
    }
  },
  /**
   * 点击图片删除按钮删除图片
   */
  delImg: function (e) {
    const that = this;
    const index = e.currentTarget.dataset.index;
    const sign = e.currentTarget.dataset.type;
    let signLeng=sign+'Length'
    that.data[sign].splice(index, 1)
    if (that.data[sign + 'ID'] && that.data[sign + 'ID'].length > 0) {//如果存在有图片已经上传过，删除的时候应该将图片ID删除
      that.data[sign + 'ID'].splice(index, 1)
    }
    that.setData({
      [sign]: that.data[sign],
      [signLeng]:that.data[sign].length
    })
  },

  /**
   * 将需要上传的图片找出来
   */
  needImgUp(){
    let imgData = this.data.picID.length > 0 ? 
                  this.data.picture.slice(this.data.picID.length, this.data.picture.length) : 
                  this.data.picture
    if (imgData.length == 0) {
      this.params.picture = JSON.stringify(this.data.picID)
      this.postUrl()
      return 
    }

    this.setData({
      showModals:true,
      pictureLength: imgData.length
    })
    this.testUpload(imgData)
  },
  /**
   * 将确定需要上传的图片进行上传
   */
  testUpload: function (imgArrs) {
    policy({fc:1}).then(res =>{
      let uploadData = res;
      const uploadTask = wx.uploadFile({
        url: uploadData.auth.host, //仅为示例，非真实的接口地址
        filePath: imgArrs[this.data.arrLength - 1] + '',
        name: "file",
        formData: {
          key: uploadData.files[0] + "." + imgArrs[this.data.arrLength - 1].split(".")[imgArrs[this.data.arrLength - 1].split(".").length - 1],
          policy: uploadData.auth.policy,
          signature: uploadData.auth.signature,
          OSSAccessKeyId: uploadData.auth.accessid,
          success_action_status: "200",
          callback: uploadData.auth.callback,
        },
        success: res => {
          this.setData({
            plan: 1//图片上传成功之后将上传进度重置为默认值
          })
          let idData = res.data ? JSON.parse(res.data) : {}
          if (idData.Status == "Ok") {
            this.data.picID.push(idData.id)
            console.log('成功上传第：' + this.data.arrLength + '张')
            ++this.data.arrLength
            this.setData({
              arrLength: this.data.arrLength
            })

            if (imgArrs.length < this.data.arrLength) {
              console.log('所有图片上传完毕')
              this.setData({
                showModals: false//将提示上传图片进度的模态框关闭
              })

              this.params.picture = JSON.stringify(this.data.picID)
              this.postUrl()
              return 
            } 
            console.log('开始上传第' + this.data.arrLength + '张')
            this.testUpload(imgArrs)
          }
        },
        fail: res => {
          this.setData({
            showModals: false,//如果图片上传失败，也需要关闭提示上传进度的提示框
            arrLength: 1// 需要将上传图片的进度恢复到初始状态
          })
          wx.showModal({
            showCancel: false,
            title: '图片上传失败',
          })

          this.data.isflag = true
        },

      })
      uploadTask.onProgressUpdate((res) => {
        console.log('上传进度', res.progress)
        this.setData({
          plan: res.progress
        })

      })
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