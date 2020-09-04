// components/normal-view/normal-view.js
Component({
  properties: {
    item: {
      type: Object,
    },
  },
  methods: {
    navTo(e) {
      const {url} = e.currentTarget.dataset
      wx.navigateTo({
        url: `pages/web-view/web-view?url=${url}`,
      })
    }
  }
})
