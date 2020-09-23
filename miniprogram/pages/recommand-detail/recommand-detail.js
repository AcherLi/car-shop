import { getRecommandById } from '../../services/cloudApi'
Page({
  data: {
    recommand: {
      title: '',
      desc: '',
      logo: '',
      images: []
    }
  },
  async onLoad(options) {
    const {id} =  options
    wx.showLoading({  title: '处理中' })
    try {
      let { result } = await getRecommandById(id)
      let data = result.data[0]
      data.nodes = data.desc.split('\n').map(v => (
        {
          name: 'div',
          attrs: {
            class: 'item-text',
          },
          children: [{
            type: 'text',
            text: v
          }]
        }
      ))
      this.setData({recommand: result.data[0]})
      wx.hideLoading()
    } catch (error) {
      console.log(error)
      wx.showToast({ title: '获取数据失败', icon: 'none' })
    }
  },
})