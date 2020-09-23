import { getRecommand, addRecommand, delRecommand } from '../../services/cloudApi'

Page({
  data: {
    tabList: [
      '分享中',
      '下架中',
    ],
    current: 0,
    recommandList: [],
    total: 0,
    page: 1,
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
      wx.showToast({ title: '加载质保数据失败' })
    }
  },
  navChange(e) {
    const { value } = e.detail
    this.setData({current: value})
    this.getRecommand(1, 0)
    this.setData({page: 1})
  },
  async handleAction(e) {
    const { id, type } = e.currentTarget.dataset
    let param = {}
    let action = addRecommand
    if (type === 'del') {
      action = delRecommand
      param = {
        _id: id
      }
      const current = this.data.recommandList.find(v => v._id === id)
      const images = [current.logo, ...current.images]
      wx.cloud.deleteFile({
        fileList: images,
        success: res => {
          console.log(res)
        },
        fail: console.error
      })
    } else {
      const status = type === 'down' ? 1 : 0
      param = {
        _id: id,
        status: status
      }
    }
    try {
      let { result } = await action(param)
      wx.hideLoading()
      if (result.code === 0) {
        wx.showToast({ title: '操作成功' })
        this.getRecommand()
        this.setData({page: 1})
      }
    } catch (error) {
      console.log(error)
      wx.showToast({ title: '操作失败' })
    }
  },
  navTo(e) {
    const { url, id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/${url}/${url}${id ? `?id=${id}` : ''}`,
    })
  },
})