import { addBanner, getBanner, delBanner } from '../../services/cloudApi'

Page({
  data: {
    bannerList: []
  },
  onReady() {
    this.getList()
  },
  async getList() {
    try {
      let { result: { data } } = await getBanner()
      this.setData({ bannerList: data })
    } catch (error) {
      wx.showToast({ title: '加载banner失败' })
    }
  },
  async handleAdd() {
    const that = this
    if (this.data.bannerList.length > 10) {
      return wx.showToast({ title: '最多添加十张', icon: "none" })
    }
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const cloudPath = `banner-${Date.now()}.png`
        wx.cloud.uploadFile({
          cloudPath: cloudPath, filePath: res.tempFilePaths[0]
        }).then(res => {
          addBanner({url: res.fileID}).then(res => {
            wx.showToast({ title: '添加成功', icon: "none" })
            that.getList()
          })
        }).catch(error => {
          console.log(error)
          return wx.showToast({ title:  error || '添加失败', icon: "none" })
        })
      }
    })
  },
  async handleDel(e) {
    if (this.data.bannerList.length === 1) {
      return wx.showToast({ title: '至少保留一张', icon: "none" })
    }
    const { id, file } = e.currentTarget.dataset
    try {
      await delBanner(id)
      wx.cloud.deleteFile({
        fileList: [file],
        success: res => {
          console.log('云文件删除成功')
        },
        fail: console.error
      })
      wx.showToast({ title: '删除成功' })
      this.getList()
    } catch (error) {
      return wx.showToast({ title: '删除banner失败' })
    }
  }
})