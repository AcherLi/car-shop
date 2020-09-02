const cloud = require('wx-server-sdk')

cloud.init()

// 插入数据示例
exports.main = async (event, context) => {
  const db = cloud.database()
  const res = await db.collection('banner').add({
    data: { url: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg' }
  })
  return res
}