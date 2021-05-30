Component({
  properties: {
    valueLength: {
        type: Number,
        value: 6
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    focusIndex: 0, // 光标所在位置
    value: '', // 实际输入的值
    focus: true, // 是否获得焦点
    password: '', //替换显示的值*
    // valueLength:0,//输入字符长度
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