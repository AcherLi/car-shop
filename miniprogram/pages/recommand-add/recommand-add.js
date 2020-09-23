import { addRecommand, getRecommandById } from '../../services/cloudApi'
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
    if (!id) return
    wx.showLoading({  title: '处理中' })
    try {
      let { result } = await getRecommandById(id)
      this.setData({recommand: result.data[0]})
      wx.hideLoading()
    } catch (error) {
      console.log(error)
      wx.showToast({ title: '获取数据失败', icon: 'none' })
    }
  },
  handleDel(e) {
    const { id, index } = e.currentTarget.dataset
    const { images } = this.data.recommand
    images.splice(index, 1)
    wx.cloud.deleteFile({
      fileList: [id],
      success: res => {
        wx.showToast({ title: '删除成功' })
      },
      fail: console.error
    })
    this.setData({recommand: {
      ...this.data.recommand,
      images,
    }})
  },
  handleDelLogo(e) {
    const { id, } = e.currentTarget.dataset
    wx.cloud.deleteFile({
      fileList: [id],
      success: res => {
        wx.showToast({ title: '删除成功' })
      },
      fail: console.error
    })
    this.setData({recommand: {
      ...this.data.recommand,
      logo: '',
    }})
  },
  imageChange(e) {
    const { value } = e.detail
    const { images } = this.data.recommand
    images.push(value)
    this.setData({recommand: {
      ...this.data.recommand,
      images,
    }})
  },
  logoChange(e) {
    const { value } = e.detail
    this.setData({recommand: {
      ...this.data.recommand,
      logo: value,
    }})
  },
  change(e) {
    const {type} = e.currentTarget.dataset
    const value = e.detail.value
    this.setData({
      recommand: {
        ...this.data.recommand,
        [type]: value
      }
    })
  },
  async submit() {
    const param = {
      ...this.data.recommand,
      status: 0,
    }
    try {
      let { result } = await addRecommand(param)
      wx.hideLoading()
      if (result.code === 0) {
        wx.showToast({ title: '操作成功' })
        wx.navigateBack()
      }
    } catch (error) {
      console.log(error)
      wx.showToast({ title: '操作失败' })
    }
  }
})