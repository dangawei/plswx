// component/button-type/button-type.js
Component({
  externalClasses: ['btn-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    btnTitle: {
      type: String,
      value: ''
    },
    bgc: {
      type: String,
      value: ''
    },
    bs: {
      type: String,
      value: 'none'
    },
    isDisabled: {
      type: Boolean,
      value: true
    },
    size: {
      type: String,
      value: 'md'
    },
    ghost: {
      type: true,
      value: false
    },
    btnNum: {
      type: String,
      value: '1'
    },
    borders: {
      type: String,
      value: 'none'
    },
    clickBool: {
      type: Boolean,
      value: false
    },
    butType: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // clickBool:false
    titleOne: '',
    titleTwo: ''
  },
  ready() {
    if (this.properties.btnTitle.indexOf(',需') != -1) {
      var titleArr = this.properties.btnTitle.split(',')
      this.setData({
        titleOne: titleArr[0] + ',',
        titleTwo: titleArr[1]
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    btnClick() {
      this.triggerEvent('btnEvent', { text: '', size: this.properties.size, btnNum: this.properties.btnNum })
    }
  }
})
