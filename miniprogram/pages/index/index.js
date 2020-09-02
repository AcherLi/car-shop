import { getBanner } from '../../services/cloudApi'

Page({
  data: {
    bannerList: [],
    recommendList: [
      {
        id: 1,
        imgUrl: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        desc: 'ViViTiger珍珠亮银色定制版',
        mark: '备注1' 
      }, 
      {
        id: 2,
        imgUrl: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        desc: 'ViViTiger珍珠亮银色',
        mark: '备注1' 
      },
      {
        id: 3,
        imgUrl: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        desc: 'ViViTiger珍珠亮银色',
        mark: '备注1' 
      },
      {
        id: 4,
        imgUrl: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        desc: 'ViViTiger珍珠亮银色',
        mark: '备注1' 
      }
    ],
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
    superiorityList: [
      {
        id: 1,
        imgUrl: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        desc: '超级平面膜',
        mark: '你好22你家' ,
      },
      {
        id: 2,
        imgUrl: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        desc: '超级平面膜',
        mark: '你好22你家' ,
      },
      {
        id: 3,
        imgUrl: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        desc: '超级平面膜',
        mark: '你好22你家' ,
      },
      {
        id: 4,
        imgUrl: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        desc: '超级平面膜',
        mark: '你好22你家' ,
      },
      {
        id: 5,
        imgUrl: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        desc: '超级平面膜',
        mark: '你好22你家' ,
      },
      {
        id: 6,
        imgUrl: 'https://m0.autoimg.cn/cardfs/upload/spec/10003/800x0_q87_autohomecar__y_20111119102105864264.jpg',
        desc: '超级平面膜',
        mark: '你好22你家' ,
      },
    ],
    contactList: [
      {
        id: 1,
        icon: '../../asserts/img/my.png',
        text: 'xxx事业部',
      },
      {
        id: 2,
        icon: '../../asserts/img/my.png',
        text: '17765544556',
      },
      {
        id: 3,
        icon: '../../asserts/img/my.png',
        text: '安徽合肥蜀山区科学大道',
      },
      {
        id: 4,
        icon: '../../asserts/img/my.png',
        text: '安徽合肥蜀山区科学大道',
      },
      {
        id: 5,
        icon: '../../asserts/img/my.png',
        text: '安徽合肥蜀山区科学大道',
      },
      {
        id: 6,
        icon: '../../asserts/img/my.png',
        text: '安徽合肥蜀山区科学大道',
      },
    ]
  },
  async onReady() {
    try {
      let { result: { data } } = await getBanner()
      data = data.map(v => v.url)
      this.setData({ bannerList: data })
    } catch (error) {
      wx.showToast({ title: '加载banner失败' })
    }
  }
})