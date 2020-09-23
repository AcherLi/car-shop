import { searchWarranty } from '../../services/cloudApi'
Page({
  data: {
    mobile: '',
    carNumber: '',
    frameNumber: '',
    rollNumber: '',
  },
  inputChange(e) {
    const {key} = e.currentTarget.dataset
    const value = e.detail.value
    this.setData({
      [key]: value
    })
  },
  async searchWarranty(mobile, carNumber, frameNumber, rollNumber) {
    wx.showLoading({  title: '查询中' })
    try {
      let { result: { data } } = await searchWarranty(mobile, carNumber, frameNumber, rollNumber)
      const { _id: id } = data[0]
      wx.navigateTo({
        url: `/pages/quality-detail/quality-detail${id ? `?id=${id}` : ''}`,
      })
      wx.hideLoading()
    } catch (error) {
      wx.showToast({ title: '查询数据失败', icon: 'none' })
    }
  },
  submit() {
    const { mobile, carNumber, frameNumber, rollNumber } = this.data
    if (mobile || carNumber || frameNumber || rollNumber) {
      this.searchWarranty(mobile, carNumber, frameNumber, rollNumber)
    } else {
      wx.showToast({ title: '请填写至少一个查询关键字', icon: 'none' })
    }
  }
})