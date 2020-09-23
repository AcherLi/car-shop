import { getCaseById } from '../../services/cloudApi'
Page({
  data: {
    case: {
      title: '',
      desc: '',
      images: []
    },
    post_cover: "https://7072-production-j3smc-1303038162.tcb.qcloud.la/img/wx.png?sign=b3bd1b7578e95e7ede50e16d902829d1&t=1600095680",
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
  shareFrends() {
    // wx.showLoading({  title: '图片生成中'  })
    // let that = this;
    // wx.getImageInfo({
    //   src: this.datacase.images[0],
    //   success: res => {
    //     console.log(res)
    //     that.createdCode() 
    //   }
    // })
  },
  //开始绘图
  createdCode() {
    // 
  },

  saveImg() {
    let that = this;
    // 获取用户是否开启用户授权相册
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              wx.saveImageToPhotosAlbum({
                filePath: that.data.shareImg,
                success() {
                  wx.showToast({ title: '保存成功' })
                },
                fail() {
                  wx.showToast({ title: '保存失败', icon: 'none' })
                }
              })
            },
            fail() {
              wx.showToast({ title: '保存失败', icon: 'none' })
            }
          })
        } else {
          wx.saveImageToPhotosAlbum({
            filePath: that.data.shareImg,
            success() {
              wx.showToast({ title: '保存成功' })
            },
            fail() {
              wx.showToast({ title: '保存失败', icon: 'none' })
            }
          })
        }
      }
    })
  },
})