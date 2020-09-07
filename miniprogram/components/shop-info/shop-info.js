Component({
  properties: {
    item: {
      type: Object,
    },
  },
  methods: {
    // 打开导航
    openLocal(e) {
      const {lat, lng} = e.currentTarget.dataset
      wx.openLocation({
        latitude: lat,
        longitude: lng,
        scale: 18
      })
    }
  }
})