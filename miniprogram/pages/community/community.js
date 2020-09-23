import { getCase } from '../../services/cloudApi'

const obj = {
  url: "https://7072-production-j3smc-1303038162.tcb.qcloud.la/person.png?sign=147d0bad78685d13011357d6aeef4d34&t=1599138640",
  imgUrl: "https://7072-production-j3smc-1303038162.tcb.qcloud.la/person.png?sign=147d0bad78685d13011357d6aeef4d34&t=1599138640",
  title: "测试测测是",
  date: "2010-09-02", 
  count: "200", 
}

Page({
  data: {
    tabList: [
      '精彩案例',
      '贴膜技术',
      '常见问题',
      '新闻资讯',
    ],
    current: 0,
    tecList: [obj, obj, obj],
    queList: [obj, obj, obj, obj],
    newList: [obj, obj, obj, obj, obj],
    caseList: [],
  },
  onLoad() {
    this.getCase()
  },
  navChange(e) {
    const { value } = e.detail
    this.setData({current: value})
    if (value == 0) {
      this.getCase()
    }
  },
  async getCase() {
    wx.showLoading({  title: '加载中' })
    try {
      let { result: { list: { data } } } = await getCase(1, 0, 8)
      data = data.map(v => ({
        ...v,
        imgUrl: v.images[0]
      }))
      let list = data
      this.setData({ caseList: list, })
      wx.hideLoading()
    } catch (error) {
      wx.showToast({ title: '加载数据失败' })
    }
  },
  navTo(e) {
    const { url, id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/${url}/${url}${id ? `?id=${id}` : ''}`,
    })
  },
})