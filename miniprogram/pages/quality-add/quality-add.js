import { addWarranty, getWarrantyById } from '../../services/cloudApi'
import { productList,  partList, qualityTimeList, styleList} from '../../config/config'

Page({
  data: {
    step: 0,
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
    wx.showLoading({  title: '处理中' })
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
  categoryChange(e) {
    const { pasterInfo } = this.data
    const categoryIndex = e.detail.value
    const colorIndex =  0
    this.setData({
      pasterInfo: {
        ...pasterInfo,
        category: productList[categoryIndex].id,
        color: productList[categoryIndex].colorList[0].id,
      },
      colorList: productList[categoryIndex].colorList,
      categoryIndex,
      colorIndex,
    })
  },
  colorChange(e) {
    const { pasterInfo, colorList } = this.data
    const index = e.detail.value
    this.setData({
      pasterInfo: {
        ...pasterInfo,
        color: colorList[index].id
      },
      colorIndex: index,
    })
  },
  partChange(e) {
    const { construction } = this.data
    const index = e.detail.value
    this.setData({
      construction: {
        ...construction,
        part: partList[index].id,
      },
      partIndex: index,
    })
  },
  qualityTimeChange(e) {
    const { construction } = this.data
    const index = e.detail.value
    this.setData({
      construction: {
        ...construction,
        qualityTime: qualityTimeList[index].id,
      },
      qualityTimeIndex: index,
    })
  },
  styleChange(e) {
    const { driver } = this.data
    const index = e.detail.value
    this.setData({
      construction: {
        ...driver,
        style: styleList[index].id,
      },
      styleIndex: index,
    })
  },
  inputChange(e) {
    const {obj, key, index} = e.currentTarget.dataset
    const value = e.detail.value
    if (index > -1) {
      const newData = this.data[obj]
      newData[index][key] = value
      this.setData({
        [obj]: newData,
      })
    } else {
      this.setData({
        [obj]: {
          ...this.data[obj],
          [key]: value
        },
      })
    }
  },
  next(e) {
    const step = Number(e.currentTarget.dataset.step) + this.data.step
    if (step === 3) {
      this.submit()
    } else {
      this.setData({
        step,
      })
    }
  },
  async submit() {
    wx.showLoading({  title: '处理中' })
    try {
      const param = {
        pasterInfo: this.data.pasterInfo,
        saleInfo: this.data.saleInfo,
        technician: this.data.technician,
        construction: this.data.construction,
        driver: this.data.driver,
      }
      if (this.data._id) {
        param._id = this.data._id
      }
      let { result } = await addWarranty(param)
      wx.showToast({ title: '录入成功' })
      wx.hideLoading()
      if (result.code === 0) {
        wx.navigateBack()
      }
    } catch (error) {
      wx.showToast({ title: '录入质保数据失败', icon: null })
    }
  },
})