import { getWarranty, delWarranty } from '../../services/cloudApi'

Page({
  data: {
    page: 1,
    total: 0,
    qualityList: [],
    keywords: ''
  },
  onShow () {
    this.getWarranty()
  },
  onPullDownRefresh() {
    this.getWarranty()
    this.setData({page: 1})
  },
  onReachBottom() {
    if (this.data.page * 20 < total) {
      const page = this.data.page + 1
      this.getWarranty(page)
    }
  },
  async getWarranty(page, keywords = '') {
    wx.showLoading({  title: '加载中' })
    try {
      let { result: { list: { data }, total } } = await getWarranty(page, keywords || this.data.keywords)
      let list = []
      if (page) {
        list = [...this.data.qualityList, ...data]
      } else {
        list = data
      }
      this.setData({ qualityList: list, total })
      wx.hideLoading()
    } catch (error) {
      wx.showToast({ title: '加载质保数据失败' })
    }
  },
  confirm(e) {
    const { value } = e.detail
    this.setData({keywords: value})
    this.getWarranty()
    this.setData({page: 1})
  },
  handleDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/quality-detail/quality-detail${id ? `?id=${id}` : ''}`,
    })
  },
  handleEdit(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/quality-add/quality-add${id ? `?id=${id}` : ''}`,
    })
  },
  async handleDel(e) {
    const { id } = e.currentTarget.dataset
    wx.showLoading({  title: '加载中' })
    try {
      let { result } = await delWarranty(id)
      wx.hideLoading()
      if (result.code === 0) {
        wx.showToast({ title: '删除成功' })
        this.getWarranty()
        this.setData({page: 1})
      }
    } catch (error) {
      console.log(error)
      wx.showToast({ title: '加载质保数据失败' })
    }
  }
})