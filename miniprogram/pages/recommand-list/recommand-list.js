import { getRecommand } from '../../services/cloudApi'

Page({
  data: {
    recommandList: [],
  },
  onShow () {
    this.getRecommand()
  },
  onPullDownRefresh() {
    this.getRecommand()
    this.setData({page: 1})
  },
  onReachBottom() {
    if (this.data.page * 20 < total) {
      const page = this.data.page + 1
      this.getRecommand(page)
    }
  },
  navTo(e) {
    const { url, id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/${url}/${url}${id ? `?id=${id}` : ''}`,
    })
  },
  async getRecommand(page, current = 0) {
    wx.showLoading({  title: '加载中' })
    try {
      let { result: { list: { data }, total } } = await getRecommand(page, current || this.data.current)
      data = data.map(v => ({
        ...v,
        imgUrl: v.logo
      }))
      let list = []
      if (page > 1) {
        list = [...this.data.recommandList, ...data]
      } else {
        list = data
      }
      this.setData({ recommandList: list, total })
      wx.hideLoading()
    } catch (error) {
      wx.showToast({ title: '加载数据失败' })
    }
  },
})