wx.cloud.init()

function invokeCloud(name, data) {
  return wx.cloud.callFunction({ name, data })
}

function userInfo(data) {
  return invokeCloud('userInfo', data)
}

function getBanner() {
  return invokeCloud('banner', {action: 'getBanner'})
}

export {
  userInfo,
  getBanner,
}