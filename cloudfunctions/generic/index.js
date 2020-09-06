const cloud = require('wx-server-sdk')

cloud.init()

/**
 * 通用数据访问
 * action 支持：list、get、add、edit、delete
 * table 支持：banner、case、recommand、shop、user、warranty
 * 
 * 新增（param 参数为要新增的对象）：
 * {
 *    "table": "banner",
 *    "action": "add",
 *    "param": {
 *      "url": "xxx"
 *    }
 * }
 * 删除（param 参数指定要删除的对象 ID）：
 * {
 *    "table": "banner",
 *    "action": "delete",
 *    "param": {
 *      "_id": "1234"
 *    }
 * }
 * 编辑（param 参数为要编辑的对象）：
 * {
 *    "table": "banner",
 *    "action": "edit",
 *    "param": {
 *      "_id": "1234",
 *      "url": "yyy"
 *    }
 * }
 * 查询列表（param 参数为查询条件，排序条件，分页条件等）：
 * orderBy 表示排序，支持设置多个排序字段
 * paging 表示分页
 * {
 *    "table": "banner",
 *    "action": "list",
 *    "param": {
 *      "orderBy": ["createTime", "desc", "id", "asc"],
 *      "paging": {
 *          "pageSize": 10,
 *          "pageNumber": 1,
 *      }
 *    }
 * }
 * where 表示查询条件，可以是一个普通对象，每个字段表示一个查询条件，支持正则查询，多个字段之间是与的关系：
 * {
 *    "table": "banner",
 *    "action": "list",
 *    "param": {
 *      "where": {
 *          "name": "xx",
 *          "title": /yy/i
 *      }
 *    }
 * }
 * where 也可以是查询指令，参考这里：
 * https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/query.html
 * const _ = db.command
 * {
 *    "table": "banner",
 *    "action": "list",
 *    "param": {
 *      "where": {
 *          "age": _.gt(30).and(_.lt(70))
 *      }
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
    let col = db.collection(table)
    // 排序
    if (param.orderBy) {
      for (let i = 0; i < param.orderBy.length; i += 2) {
        col = col.orderBy(param.orderBy[i], param.orderBy[i+1])
      }
    }
    // 过滤
    if (param.where) {
      col = col.where(param.where)
    }
    // 分页
    if (param.paging) {
      // 带分页，返回总数和当前页数据
      resp = {
        total: await col.count(),
        list: await col.skip(param.paging.pageSize * (param.paging.pageNumber - 1))
                       .limit(param.paging.pageSize).get()
      }
    } else {
      // 不带分页，返回所有数据
      resp = await col.get()
    }
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