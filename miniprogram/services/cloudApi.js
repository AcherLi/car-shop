wx.cloud.init()

function invokeCloud(name, data) {
  return wx.cloud.callFunction({ name, data })
}

function userInfo(data) {
  return invokeCloud('userInfo', data)
}

export {
  userInfo
}