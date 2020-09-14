Component({
  methods: {
    upload() {
      const that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const cloudPath = `banner-${Date.now()}.png`
          wx.cloud.uploadFile({
            cloudPath: cloudPath, filePath: res.tempFilePaths[0]
          }).then(res => {
            wx.showToast({ title: '上传成功', icon: "none" })
            that.triggerEvent('change', {value:  res.fileID})
          }).catch(error => {
            console.log(error)
            return wx.showToast({ title: '上传失败', icon: "none" })
          })
        }
      })
    }
  }
})
