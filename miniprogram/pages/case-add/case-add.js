import { addCase, getCaseById } from '../../services/cloudApi'
Page({
  data: {
    case: {
      title: '',
      desc: '',
      images: []
    }
  },
  async onLoad(options) {
    const {id} =  options
    wx.showLoading({  title: '处理中' })
    try {
      let { result } = await getCaseById(id)
      this.setData({case: result.data[0]})
      wx.hideLoading()
    } catch (error) {
      console.log(error)
      wx.showToast({ title: '获取数据失败', icon: 'none' })
    }
  },
  handleDel(e) {
    const { id, index } = e.currentTarget.dataset
    const { images } = this.data.case
    images.splice(index, 1)
    wx.cloud.deleteFile({
      fileList: [id],
      success: res => {
        wx.showToast({ title: '删除成功' })
      },
      fail: console.error
    })
    this.setData({case: {
      ...this.data.case,
      images,
    }})
  },
  imageChange(e) {
    const { value } = e.detail
    const { images } = this.data.case
    images.push(value)
    this.setData({case: {
      ...this.data.case,
      images,
    }})
  },
  change(e) {
    const {type} = e.currentTarget.dataset
    const value = e.detail.value
    this.setData({
      case: {
        ...this.data.case,
        [type]: value
      }
    })
  },
  async submit() {
    const param = {
      ...this.data.case,
      status: 2,
    }
    try {
      let { result } = await addCase(param)
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