import { getCase, addCase } from '../../services/cloudApi'

const statusList = [2, 0]
Page({
  data: {
    tabList: [
      '待审核',
      '已审核',
    ],
    current: 0,
    caseList: [],
    total: 0,
    page: 1,
  },
  onShow () {
    this.getCase()
  },
  onPullDownRefresh() {
    this.getCase()
    this.setData({page: 1})
  },
  onReachBottom() {
    if (this.data.page * 20 < this.data.total) {
      const page = this.data.page + 1
      this.getCase(page)
    }
  },
  async getCase(page, current = 0) {
    wx.showLoading({  title: '加载中' })
    try {
      let { result: { list: { data }, total } } = await getCase(
        page,
        statusList[current || this.data.current]
      )
      data = data.map(v => ({
        ...v,
        imgUrl: v.images[0]
      }))
      let list = []
      if (page > 1) {
        list = [...this.data.caseList, ...data]
      } else {
        list = data
      }
      this.setData({ caseList: list, total })
      wx.hideLoading()
    } catch (error) {
      console.log(error)
      wx.showToast({ title: '加载据失败', icon: 'none' })
    }
  },
  navChange(e) {
    const { value } = e.detail
    this.setData({current: value})
    this.getCase(1, 0)
    this.setData({page: 1})
  },
  async handleAction(e) {
    const { id, type } = e.currentTarget.dataset
    let param = {_id: id}
    let action = addCase
    if (type === 'del') {

    } else if (type == 'refuse') {
      param.status =  3 
    } else if (type == 'access') {
      param.status =  0 
    } else if (type == 'down') {
      param.status =  2
    }
    try {
      let { result } = await action(param)
      wx.hideLoading()
      if (result.code === 0) {
        wx.showToast({ title: '操作成功' })
        this.getCase()
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