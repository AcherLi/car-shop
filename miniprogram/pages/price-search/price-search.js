import { productList, styleList} from '../../config/config'

Page({
  data: {
    price: '￥100000',
    categoryList: productList,
    allColorlist: productList[0].colorList,
    colorList: [],
    styleList,
    categoryIndex: '',
    colorIndex: '',
    styleIndex: '',
    from: {
      category: null,
      color: null,
      part: null,
    }
  },
  onLoad: function (options) {

  },
  categoryChange(e) {
    const { from } = this.data
    const categoryIndex = e.detail.value
    const colorIndex =  0
    this.setData({
      from: {
        ...from,
        category: productList[categoryIndex].id,
        color: productList[categoryIndex].colorList[0].id,
      },
      colorList: productList[categoryIndex].colorList,
      categoryIndex,
      colorIndex,
    })
  },
  colorChange(e) {
    const { from, colorList } = this.data
    const index = e.detail.value
    this.setData({
      from: {
        ...from,
        color: colorList[index].id
      },
      colorIndex: index,
    })
  },
  styleChange(e) {
    const { from } = this.data
    const index = e.detail.value
    this.setData({
      from: {
        ...from,
        part: styleList[index].id,
      },
      styleIndex: index,
    })
  },
})