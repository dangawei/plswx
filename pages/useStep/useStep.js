const BORROW_STEP1 = 'borrowStep1', BORROW_STEP2 = 'borrowStep2', RETURN_STEP2 = 'returnStep2', RETURN_STEP1 = 'returnStep1'
let timer
Page({
  data: {
    interval: 3000,
    stepData: {
      type: BORROW_STEP1,
      title: '新手借伞指引',
      imgUrl: ['pwd-borrow-s1-update', 'pwd-borrow-s2-update'],
    },
    disabled:true,
    checked:false,
    // buryNum:3,//埋点标识 3借伞6还伞
  },
  onLoad(query) {
    this.query = query
    // if (this.query.borrow_code) {
    if (this.query.type==1) {
      wx.setNavigationBarTitle({
        title: '借伞步骤'
      });
      this.setData({
        stepData: {
          type: BORROW_STEP1,
          title: '新手借伞指引',
          imgUrl: ['pwd-borrow-s1-update', 'pwd-borrow-s2-update'],
        },
        // buryNum:3
      })
    } else {
      wx.setNavigationBarTitle({
        title: '还伞步骤'
      });
      this.setData({
        stepData: {
          type: BORROW_STEP1,
          title: '新手还伞指引',
          imgUrl: ['pwd-return-s1-update', 'pwd-return-s2-update'],
        },
        // buryNum:6
      })
    }
    this.controlTime(this.query.borrow_code)
  },
  onShow(){
    // filter.buryPointHttp(this.data.buryNum)
  },
  controlTime:function(isBorrow){
    let btnTime = 9
    timer = setInterval(()=>{
      this.setData({
        btnTitle:isBorrow ? `开始借伞 ${--btnTime}` : `开始还伞 ${--btnTime}`
      })
      if(btnTime <=0){
        clearInterval(timer)
        this.setData({
          disabled:false,
          btnTitle:isBorrow? '去借伞' : '去还伞'
        })
      }
    },1000)
  },
  nextStep: function() {
    const { stepData,checked } = this.data
    const { borrow_code, pail_no, order_no } = this.query
    
    // if (borrow_code) {
    //     wx.navigateTo({ url: `/pages/pwdBorrow/pwdBorrow?pail_no=${pail_no}&borrow_code=${borrow_code}&order_no=${order_no}` });
    //     if(checked) wx.setStorage({key: 'pwd-borrow-step', data: true});
    // } else {
    //     wx.navigateTo({ url: `/pages/pwdReturn/pwdReturn?pail_no=${pail_no}` });
    //     if(checked) wx.setStorage({ key: 'pwd-return-step', data: true });
    // }
  },
  radioChange:function(){
    const {checked} =this.data
    this.setData({
      checked:!checked
    })
  }
});