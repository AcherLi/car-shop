import { userInfo } from './services/cloudApi'

App({
  onLaunch: function () {
    this.globalData = {}
    // userInfo().then(res => {
    //   console.log(res)
    // })
  }
})
