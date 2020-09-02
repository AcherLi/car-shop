const cloud = require('wx-server-sdk')

cloud.init()

/**
 * 通用数据访问
 * action 支持：list、get、add、edit、delete
 * table 支持：banner、case、recommand、shop、user、warranty
 * {
 *    "table": "banner",
 *    "action": "add",
 *    "param": {
 *      "url": "xxx"
 *    }
 * }
 */
exports.main = async (event, context) => {
  switch (event.action) {
    // 获取列表
    case 'list': {
      return _list(event.table, event.param)
    }
    // 获取详情
    case 'get': {
      return _get(event.table, event.param)
    }
    // 删除
    case 'delete': {
      return _delete(event.table, event.param)
    }
    // 新增
    case 'add': {
      return _add(event.table, event.param)
    }
    // 编辑
    case 'edit': {
      return _edit(event.table, event.param)
    }
    default: {
      return
    }
  }
}

async function _list(table, param) {
  const db = cloud.database()
  let resp = {}
  try {
    resp = await db.collection(table).get()
  } catch (error) {
    resp = error
  }
  return resp
}

async function _get(table, param) {
  const db = cloud.database()
  let resp = {}
  try {
    resp = await db.collection(table).doc(param._id).get()
  } catch (error) {
    resp = error
  }
  return resp
}

async function _delete(table, param) {
  const db = cloud.database()
  const resp = {}
  try {
    const data = await db.collection(table).doc(param._id).remove()
    resp.code = 0
    resp.data = data
  } catch (error) {
    resp.code = -1
    resp.data = error
  }
  return resp
}

async function _add(table, param) {
  const db = cloud.database()
  const resp = {}
  try {
    const data = await db.collection(table).add({data: param})
    resp.code = 0
    resp.data = data
  } catch (error) {
    resp.code = -1
    resp.data = error
  }
  return resp
}

async function _edit(table, param) {
  const db = cloud.database()
  const resp = {}
  try {
    const doc = param._id
    delete param._id
    const data = await db.collection(table).doc(doc).update({data:param})
    resp.code = 0
    resp.data = data
  } catch (error) {
    resp.code = -1
    resp.data = error
  }
  return resp
}