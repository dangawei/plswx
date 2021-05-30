// component/pls-modal/pls-modal.js
Component({
  externalClasses: ['w-class'],

  options: {
      multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    showClose: {
      type: Boolean,
      value: false
    },
    size:{
      type: String,
      value: 'middle'
    },
    topImage:{
      type: String,
      value: ''
    },
    topImageSize:{
      type: String,
      value: 'md'
    },
    isModal:{
      type: Boolean,
      value: true
    },
    isClass:{
      type: String,
      value: ''
    },
    classFooter:{
      type: String,
      value: ''
    },
    classHeader:{
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onModalClose(){
      // var onModalClose = this.props.onModalClose;
      // if (onModalClose) {
      //   this.triggerEvent('modalClose')
      // }
      this.triggerEvent('modalClose')
    }
  }
})
