Component({
  externalClasses: ['i-class'],

  options: {
      multipleSlots: true
  },

  properties: {
      full: {
          type: Boolean,
          value: false
      },
      content: {
          type: Boolean,
          value: false
      },
      footer: {
          type: Boolean,
          value: false
      },
      thumb: {
          type: String,
          value: ''
      },
      title: {
          type: String,
          value: ''
      },
      extra: {
          type: String,
          value: ''
      },
      alignSelf:{
        type: Boolean,
        value: false
      }
  }
});
