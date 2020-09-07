Component({
  properties: {
    item: {
      type: Object,
    },
  },
  methods: {
    // 打开电话
    phoneCall(e) {
      const { phone } = e.currentTarget.dataset
      wx.makePhoneCall({
        phoneNumber: phone
      })
    }
  }
})