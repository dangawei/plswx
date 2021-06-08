Component({
  properties: {
    valueLength: {
        type: Number,
        value: 6
    },
    codeNum: {
        type: Number,
        value:1
    },
    valueData:{
      type:String,
      value:'',
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    focusIndex: 0, // 光标所在位置
    value: '', // 实际输入的值
    focus: false, // 是否获得焦点
    password: '', //替换显示的值*
    // valueLength:0,//输入字符长度
    numberAs:1
  },
  // observers: {
  //   'codeNum': function (params) {
  //     console.log(66565)  
  //   }
  // },
  pageLifetimes: {
    show: function() {
      if(this.properties.valueData){
        this.setData({
          value:this.properties.valueData,
          focus:false
        })
      }
    },

  },
  /**
   * 组件的方法列表
   */
  methods: {
    setValue (e) {
      // 设置光标
      var value = e.detail.value
      this.setData({
        value: value,
        focusIndex: value.length,
        focus: value.length < this.properties.valueLength,
        password: '*'.repeat(value.length)
      })
      this.triggerEvent('focusIndex', {
        value: value.length
      })
    },
    inputBlur (e) {
      if (e.detail.value.length === this.properties.valueLength) {
        this.triggerEvent('complated', {
          value: e.detail.value
        })
      }
    }
  }
})