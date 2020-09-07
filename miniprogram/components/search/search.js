// components/search/search.js
Component({
  properties: {
    placeholder: {
      type: String,
    },
    maxlength: {
      type: Number,
      value: 50,
    }
  },
  methods: {
    confirm(e) {
      this.triggerEvent('confirm', {value: e.detail.value})
    }
  }
})
