wx.cloud.init()

function invokeCloud(name, data) {
  return wx.cloud.callFunction({ name, data })
}

function userInfo(data) {
  return invokeCloud('userInfo', data)
}

function getBanner() {
  return invokeCloud('generic', {action: 'list', table: 'banner', param: {}})
}

function delBanner(id) {
  return invokeCloud('generic', { action: 'delete', table: 'banner', param: { _id: id }})
}

function addBanner(param) {
  return invokeCloud('generic', { action: 'add', table: 'banner', param, })
}

function getWarranty(page = 1, keyWords = '') {
  const param = {
    orderBy: ["createTime", "desc",],
    paging: {
      pageSize: 10,
      pageNumber: page,
    }
  }
  if (keyWords) {
    param.where = {
      "driver.mobile": keyWords,
    }
  }
  return invokeCloud('generic', {action: 'list', table: 'warranty', param, })
}

function addWarranty(param) {
  return invokeCloud('generic', {action: param._id ? 'edit' : 'add', table: 'warranty', param, })
}

function getWarrantyById(id) {
  return invokeCloud('generic', {action: 'list', table: 'warranty', param: {
    where: {
      "_id": id
    }
  }})
}

function delWarranty(id) {
  return invokeCloud('generic', { action: 'delete', table: 'warranty', param: { _id: id }})
}

function getCase(page = 1, status = 0) {
  const param = {
    orderBy: ["createTime", "desc",],
    paging: {
      pageSize: 10,
      pageNumber: page,
    },
    where: {
      status,
    }
  }
  return invokeCloud('generic', {action: 'list', table: 'case', param, })
}

function addCase(param) {
  return invokeCloud('generic', {action: param._id ? 'edit' : 'add', table: 'case', param, })
}

function getCaseById(id) {
  return invokeCloud('generic', {action: 'list', table: 'case', param: {
    where: {
      "_id": id
    }
  }})
}

function delCase(id) {
  return invokeCloud('generic', { action: 'delete', table: 'case', param: { _id: id }})
}

export {
  userInfo,
  getBanner,
  delBanner,
  addBanner,
  getWarranty,
  addWarranty,
  getWarrantyById,
  delWarranty,
  getCase,
  addCase,
  getCaseById,
  delCase,
}