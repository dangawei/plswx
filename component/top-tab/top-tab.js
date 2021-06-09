// component/topTab/topTab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bColor:{
      type:String,
      value: '#FFC002'
    },
    bgcolor:{
      type:String,
      value: '#F8F8F8'
    },
    selTitle:{
      type:String,
      value: 0
    },
    dataArr:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // selTitle:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickTitle(e){
      this.setData({
        selTitle:e.currentTarget.dataset.num
      })
      this.triggerEvent('clickTitle',e)
    }
  }
})
