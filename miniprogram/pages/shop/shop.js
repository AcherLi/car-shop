Page({
  data: {
    shopList: [{
      id: 1,
      name: '测上线',
      score: 9.0,
      case: 111,
      distance: 1.2,
      address: '详细地址',
      phone: '17765566776',
      openTime: '9:00',
      closeTime: '18:00',
      banner: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
      pos: {
        latitude: 31.23037,
        longitude: 121.4737,
      },
    }, {
      id: 2,
      name: '测上线',
      score: 9.0,
      case: 111,
      distance: 1.2,
      address: '详细地址',
      phone: '17765566776',
      openTime: '9:00',
      closeTime: '18:00',
      banner: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
      pos: {
        latitude: 31.23037,
        longitude: 121.4737,
      },
    }]
  },
  onReady() {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log(latitude, longitude)
      }
     })
  },
  confirm(e) {
    const { value } = e.detail
    console.log(value)
  },
  navTo(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/shop-detail/shop-detail?id=${id}`,
    })
  }
})