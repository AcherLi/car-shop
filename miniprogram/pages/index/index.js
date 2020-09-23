import { getBanner } from '../../services/cloudApi'
import { getCase, getRecommand } from '../../services/cloudApi'

Page({
  data: {
    bannerList: [],
    recommandList: [],
    caseList: [],
    superiorityList: [
      {
        id: 1,
        imgUrl: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        desc: '超级平面膜',
        mark: '你好22你家' ,
      },
      {
        id: 2,
        imgUrl: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        desc: '超级平面膜',
        mark: '你好22你家' ,
      },
      {
        id: 3,
        imgUrl: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        desc: '超级平面膜',
        mark: '你好22你家' ,
      },
      {
        id: 4,
        imgUrl: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        desc: '超级平面膜',
        mark: '你好22你家' ,
      },
      {
        id: 5,
        imgUrl: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        desc: '超级平面膜',
        mark: '你好22你家' ,
      },
      {
        id: 6,
        imgUrl: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        desc: '超级平面膜',
        mark: '你好22你家' ,
      },
    ],
    contactList: [
      {
        id: 1,
        icon: '../../asserts/img/my.png',
        text: 'xxx事业部',
      },
      {
        id: 2,
        icon: '../../asserts/img/my.png',
        text: '17765544556',
      },
      {
        id: 3,
        icon: '../../asserts/img/my.png',
        text: '安徽合肥蜀山区科学大道',
      },
      {
        id: 4,
        icon: '../../asserts/img/my.png',
        text: '安徽合肥蜀山区科学大道',
      },
      {
        id: 5,
        icon: '../../asserts/img/my.png',
        text: '安徽合肥蜀山区科学大道',
      },
      {
        id: 6,
        icon: '../../asserts/img/my.png',
        text: '安徽合肥蜀山区科学大道',
      },
    ]
  },
  async onShow() {
    this.getBanner()
    this.getCase()
    this.getRecommand()
  },
  navTo(e) {
    const { url, id, src } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/${url}/${url}${id ? `?id=${id}` : ''}${src ? `?url=${src}` : ''}`,
    })
  },
  tabTo(e) {
    const { url } = e.currentTarget.dataset
    wx.switchTab({
      url: `/pages/${url}/${url}`
    })
  },
  async getBanner() {
    try {
      let { result: { data } } = await getBanner()
      data = data.map(v => v.url)
      this.setData({ bannerList: data })
    } catch (error) {
      wx.showToast({ title: '加载banner失败' })
    }
  },
  async getCase() {
    wx.showLoading({  title: '加载中' })
    try {
      let { result: { list: { data } } } = await getCase(1, 0, 6)
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
  async getRecommand() {
    wx.showLoading({  title: '加载中' })
    try {
      let { result: { list: { data } } } = await getRecommand(1, 0, 4)
      data = data.map(v => ({
        ...v,
        imgUrl: v.logo
      }))
      let list = data
      this.setData({ recommandList: list, })
      wx.hideLoading()
    } catch (error) {
      wx.showToast({ title: '加载数据失败' })
    }
  },
})