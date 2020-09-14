const obj = {
  url: "https://7072-production-j3smc-1303038162.tcb.qcloud.la/person.png?sign=147d0bad78685d13011357d6aeef4d34&t=1599138640",
  imgUrl: "https://7072-production-j3smc-1303038162.tcb.qcloud.la/person.png?sign=147d0bad78685d13011357d6aeef4d34&t=1599138640",
  title: "测试测测是",
  date: "2010-09-02", 
  count: "200", 
}

Page({
  data: {
    tabList: [
      '精彩案例',
      '贴膜技术',
      '常见问题',
      '新闻资讯',
    ],
    current: 0,
    tecList: [obj, obj, obj],
    queList: [obj, obj, obj, obj],
    newList: [obj, obj, obj, obj, obj],
    exampleList: [
      {
        id: 1,
        imgUrl: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        desc: 'ViViTiger珍珠亮银色',
        mark: '备注1' ,
        count: 123,
        avatar: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        nickName: '你好1234'
      },
      {
        id: 2,
        imgUrl: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        desc: 'ViViTiger珍珠亮银色',
        mark: '备注1' ,
        count: 123,
        avatar: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        nickName: '你好1234'
      },
      {
        id: 3,
        imgUrl: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        desc: 'ViViTiger珍珠亮银色',
        mark: '备注1' ,
        count: 123,
        avatar: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        nickName: '你好1234'
      },
      {
        id: 4,
        imgUrl: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        desc: 'ViViTiger珍珠亮银色',
        mark: '备注1' ,
        count: 123,
        avatar: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        nickName: '你好1234'
      }
    ],
  },
  navChange(e) {
    const { value } = e.detail
    this.setData({current: value})
  }
})