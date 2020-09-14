Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: undefined
  },
  onLoad () {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.setData({userInfo: res.userInfo})
            }
          })
        } else {
          this.setData({userInfo: null})
        }
      }
    })
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          console.log(res)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  bindGetUserInfo (e) {
    this.setData({userInfo: e.detail.userInfo})
  },
  getPhoneNumber (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  navTo(e) {
    const { page } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/${page}/${page}`,
    })
  } 
})