import { getWarrantyById } from '../../services/cloudApi'
import { productList,  partList, qualityTimeList, styleList} from '../../config/config'

Page({
  data: {
    categoryList: productList,
    allColorlist: productList[0].colorList,
    colorList: [],
    partList,
    qualityTimeList,
    styleList,
    pasterInfo: {
      category: null,
      color: null,
      rollNumber: '',
      remark: '',
    },
    saleInfo: {
      price: '',
      mobile: '',
      name: '',
    },
    technician: [{
      name: "",
      mobile: "",
    }],
    construction: {
      part: "",
      remark: "",
      qualityTime: '',
      handleDate: "",
      installDate: "",
    },
    driver: {
      name: "",
      mobile: "",
      carNumber: "",
      frameNumber: "",
      style: "",
    },
    _id: '',
    categoryIndex: '',
    colorIndex: '',
    partIndex: '',
    qualityTimeIndex: '',
    styleIndex: '',
  },
  onLoad(options) {
    const {id} =  options
    if (id) {
      this.initData(id)
    }
  },
  async initData(id) {
    wx.showLoading({  title: '录入中' })
    try {
      let { result: { data, code } } = await getWarrantyById(id)
      wx.hideLoading()
      if (data[0]) {
        const {pasterInfo, construction, saleInfo, technician, driver, _id } = data[0]
        this.setData({
          pasterInfo,
          construction,
          saleInfo,
          technician,
          driver,
          _id
        })
        // 处理picke
        let categoryIndex = 0
        let colorList = []
        let colorIndex = 0
        let partIndex = 0
        let qualityTimeIndex = 0
        let styleIndex = 0
        productList.forEach((v, k) => {
          if (v.id === pasterInfo.category) {
            categoryIndex = k
            colorList = v.colorList
            v.colorList.forEach((vv, kk) => {
              if (vv.id === pasterInfo.color) {
                colorIndex = kk
              }
            })
          }
        })
        partList.forEach((v, k) => {
          if (v.id === construction.part) {
            partIndex = k
          }
        })
        qualityTimeList.forEach((v, k) => {
          if (v.id === construction.qualityTime) {
            qualityTimeIndex = k
          }
        })
        styleList.forEach((v, k) => {
          if (v.id === driver.style) {
            styleIndex = k
          }
        })
        this.setData({
          categoryIndex,
          colorList,
          colorIndex,
          partIndex,
          qualityTimeIndex,
          styleIndex,
        })
      }
    } catch (error) {
      console.log(error)
      wx.showToast({ title: '获取数据失败', icon: 'none' })
    }
  },
})