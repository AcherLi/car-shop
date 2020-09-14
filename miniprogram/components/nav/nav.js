Component({
  properties: {
    tabList: {
      type: Array
    },
    current: {
      type: Number
    }
  },
  methods: {
    clickNav(e) {
      const {current} = e.currentTarget.dataset
      this.triggerEvent('change', {value: current})
    }
  }
})
