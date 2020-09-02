//app.js
App({
  onLaunch: function () {
    this.globalData = {}
    wx.cloud.callFunction({
      // 云函数名称
      name: 'userInfo',
      // 传给云函数的参数
      data: {
        a: 1,
        b: 2,
      },
      success: function(res) {
        console.log(res) // 3
      },
      fail: console.error
    })
  }
})
