const cloud = require('wx-server-sdk')

cloud.init()

// 头部横幅
exports.main = async (event, context) => {
  switch (event.action) {
    // 获取列表
    case 'getBannerList': {
      return getBannerList(event.param)
    }
    // 获取详情
    case 'getBanner': {
      return getBanner(event.param)
    }
    // 删除
    case 'deleteBanner': {
      return deleteBanner(event.param)
    }
    // 新增
    case 'addBanner': {
      return addBanner(event.param)
    }
    // 编辑
    case 'editBanner': {
      return editBanner(event.param)
    }
    default: {
      return
    }
  }
}

async function getBannerList(param) {
  const db = cloud.database()
  let resp = {}
  try {
    resp = await db.collection('banner').get()
  } catch (error) {
    resp = error
  }
  return resp
}

async function getBanner(param) {
  const db = cloud.database()
  let resp = {}
  try {
    resp = await db.collection('banner').doc(param._id).get()
  } catch (error) {
    resp = error
  }
  return resp
}

async function deleteBanner(param) {
  const db = cloud.database()
  const resp = {}
  try {
    const data = await db.collection('banner').doc(param._id).remove()
    resp.code = 0
    resp.data = data
  } catch (error) {
    resp.code = -1
    resp.data = error
  }
  return resp
}

async function addBanner(param) {
  const db = cloud.database()
  const resp = {}
  try {
    const data = await db.collection('banner').add({data: param})
    resp.code = 0
    resp.data = data
  } catch (error) {
    resp.code = -1
    resp.data = error
  }
  return resp
}

async function editBanner(param) {
  const db = cloud.database()
  const resp = {}
  try {
    const doc = param._id
    delete param._id
    const data = await db.collection('banner').doc(doc).update({data:param})
    resp.code = 0
    resp.data = data
  } catch (error) {
    resp.code = -1
    resp.data = error
  }
  return resp
}