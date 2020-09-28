import { getCaseById } from '../../services/cloudApi'
Page({
  data: {
    case: {
      title: '',
      desc: '',
      images: [],
      address: '测试店铺',
    },
    visiable: false,
    shareImg: ''
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
  hideModel() {
    this.setData({visiable: false})
  },
  shareFrends() {
    wx.showLoading({  title: '图片生成中'  })
    wx.getImageInfo({
      src: this.data.case.images[0],
      success: res => {
        this.createdCode(res.path) 
      }
    })
  },
  //开始绘图
  createdCode(src) {
    const ctx = wx.createCanvasContext('shareFrends');
    ctx.save()
    ctx.drawImage('../../asserts/img/white-bg.png', 0, 0, 300, 600);
    ctx.drawImage(src, 20, 20, 275, 240);
    ctx.fillStyle='#202020'
    ctx.fillRect(20, 260, 275, 76);
    ctx.fillStyle='#fff'
    ctx.fillText(this.data.case.title, 30, 280);
    ctx.setTextAlign('left');
    ctx.drawImage(src, 30, 290, 20, 20);
    ctx.fillStyle='#FF841D'
    ctx.fillText(this.data.case.address || '测试店铺', 60, 304);
    ctx.fillStyle='#999'
    ctx.fillText(this.data.case.date || '2020-09-09', 214, 304);
    ctx.fillStyle='#000'
    ctx.fillText('长按图片保存至相册', 30, 370);
    ctx.fillText('快去分享吧', 30, 390);
    ctx.drawImage('../../asserts/img/qrcode.jpg', 234, 346, 60, 60);
    ctx.draw()
    setTimeout(() => {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        fileType: 'png',
        canvasId: 'shareFrends',
        success: res => {
          this.setData({
            shareImg: res.tempFilePath,
            visiable: true
          })
          wx.hideLoading()
        }
      })
    }, 500)
  },
  saveImg() {
    // 获取用户是否开启用户授权相册
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              this.save()
            },
            fail() {
              wx.showToast({ title: '保存失败', icon: 'none' })
            }
          })
        } else {
          this.save()
        }
      }
    })
  },
  save() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImg,
      success: () => {
        wx.showToast({ title: '保存成功' })
      },
      fail: () => {
        wx.showToast({ title: '保存失败', icon: 'none' })
      }
    })
  }
})