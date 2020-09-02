const cloud = require('wx-server-sdk')

cloud.init()

// banner相关服务
exports.main = async (event, context) => {
  switch (event.action) {
    case 'getBanner': {
      return getBanner()
    }
    case 'deleteBanner': {
      return deleteBanner(event)
    }
    case 'addBanner': {
      return addBanner(event)
    }
    default: {
      return
    }
  }
}

async function getBanner() {
  const db = cloud.database()
  let resp = {}
  try {
    resp = await db.collection('banner').get()
  } catch (error) {
    resp = error
  }
  return resp
}

async function deleteBanner() {
  const db = cloud.database()
  const resp = {}
  try {
    const data = await db.collection('banner').get().limit(20)
    resp.code = 0
    resp.data = data
  } catch (error) {
    resp.code = -1
    resp.data = error
  }
  return resp
}

async function addBanner() {
  const db = cloud.database()
  const resp = {}
  try {
    const data = await db.collection('banner').get().limit(20)
    resp.code = 0
    resp.data = data
  } catch (error) {
    resp.code = -1
    resp.data = error
  }
  return resp
}
