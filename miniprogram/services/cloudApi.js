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

function searchWarranty(mobile, carNumber, frameNumber, rollNumber) {
  const obj = {}
  if (mobile) obj['driver.mobile'] = mobile
  if (carNumber) obj['driver.carNumber'] = carNumber
  if (frameNumber) obj['driver.frameNumber'] = frameNumber
  if (rollNumber) obj['pasterInfo.rollNumber'] = rollNumber
  const param = {
    where: obj
  }
  return invokeCloud('generic', {action: 'list', table: 'warranty', param: param, })
}

function getCase(page = 1, status = 0, pageSize = 20) {
  const param = {
    orderBy: ["createTime", "desc",],
    paging: {
      pageSize,
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

function delCase(param) {
  return invokeCloud('generic', { action: 'delete', table: 'case', param })
}

function getRecommand(page = 1, status = 0, pageSize = 20) {
  const param = {
    orderBy: ["createTime", "desc",],
    paging: {
      pageSize,
      pageNumber: page,
    },
    where: {
      status,
    }
  }
  return invokeCloud('generic', {action: 'list', table: 'recommand', param, })
}

function addRecommand(param) {
  return invokeCloud('generic', {action: param._id ? 'edit' : 'add', table: 'recommand', param, })
}

function getRecommandById(id) {
  return invokeCloud('generic', {action: 'list', table: 'recommand', param: {
    where: {
      "_id": id
    }
  }})
}

function delRecommand(param) {
  return invokeCloud('generic', { action: 'delete', table: 'recommand', param })
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
  searchWarranty,
  getCase,
  addCase,
  getCaseById,
  delCase,
  getRecommand,
  addRecommand,
  getRecommandById,
  delRecommand,
}