Page({
  data: {
    height: '', // 用户输入的身高
    heightPercentile: null, // 身高百分比结果
    showHeightResult: false, // 是否显示身高评测结果
    showHeightInput: false, // 是否显示身高输入框
    // 中国成年男性身高分布数据（来自国家卫健委）
    heightData: {
      // 身高（厘米）对应的百分位数 - 更新为最新数据
      160: 5,   // 5%的成年男性身高低于160cm
      165: 15,  // 15%的成年男性身高低于165cm
      169.7: 50, // 50%的成年男性身高低于169.7cm（中位数）
      175: 80,  // 80%的成年男性身高低于175cm
      178: 90,  // 90%的成年男性身高低于178cm
      183: 95,  // 95%的成年男性身高低于183cm
      190: 99   // 99%的成年男性身高低于190cm
    }
  },

  onLoad() {
    console.log('身体测评页面加载')
  },
  
  onShow() {
    // 设置自定义导航栏按钮
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff'
    })
  },
  
  onHide() {
    // 页面隐藏时重置状态
    if (this.data.showHeightInput || this.data.showHeightResult) {
      this.backToList()
    }
  },
  
  onUnload() {
    // 页面卸载时取消监听
    wx.offBackPress()
  },

  // 显示身高评测输入框
  showHeightEvaluation() {
    console.log('显示身高评测输入框')
    this.setData({
      showHeightInput: true,
      showHeightResult: false,
      height: ''
    })
  },

  // 输入身高时触发
  onHeightInput(e) {
    this.setData({
      height: e.detail.value
    })
  },

  // 身高评测按钮点击事件
  evaluateHeight() {
    const height = parseFloat(this.data.height)
    
    // 验证输入
    if (!height || isNaN(height) || height < 140 || height > 220) {
      wx.showToast({
        title: '请输入有效身高(140-220cm)',
        icon: 'none'
      })
      return
    }

    // 计算百分位数
    const percentile = this.calculateHeightPercentile(height)
    
    this.setData({
      heightPercentile: percentile,
      showHeightResult: true,
      showHeightInput: false
    })
  },

  // 计算身高百分位数
  calculateHeightPercentile(height) {
    const heightData = this.data.heightData
    const heights = Object.keys(heightData).map(Number).sort((a, b) => a - b)
    
    // 如果身高低于最低值
    if (height < heights[0]) {
      return heightData[heights[0]]
    }
    
    // 如果身高高于最高值
    if (height > heights[heights.length - 1]) {
      return 99
    }
    
    // 找到身高所在区间
    for (let i = 0; i < heights.length - 1; i++) {
      if (height >= heights[i] && height < heights[i + 1]) {
        // 线性插值计算百分位数
        const lowerHeight = heights[i]
        const upperHeight = heights[i + 1]
        const lowerPercentile = heightData[lowerHeight]
        const upperPercentile = heightData[upperHeight]
        
        const ratio = (height - lowerHeight) / (upperHeight - lowerHeight)
        return Math.round(lowerPercentile + ratio * (upperPercentile - lowerPercentile))
      }
    }
    
    // 默认返回50（如果计算出错）
    return 50
  },

  // 处理导航栏返回按钮点击
  handleNavigationBack() {
    console.log('导航栏返回按钮点击', this.data.showHeightResult, this.data.showHeightInput)
    
    // 如果在结果页面，返回到输入页面
    if (this.data.showHeightResult) {
      this.backToInputPage();
      return;
    }
    
    // 如果在输入页面，返回到测评列表
    if (this.data.showHeightInput) {
      this.backToList();
      return;
    }
    
    // 如果在测评列表，返回到主页面
    this.returnToHome();
  },

  // 返回测评列表
  backToList() {
    console.log('返回测评列表')
    this.setData({
      showHeightResult: false,
      showHeightInput: false
    })
  },
  
  // 返回输入页面
  backToInputPage() {
    console.log('返回输入页面')
    this.setData({
      showHeightResult: false,
      showHeightInput: true
    })
  },
  
  // 返回主界面
  returnToHome() {
    console.log('返回主界面')
    wx.navigateBack({
      delta: 1,
      success: function() {
        console.log('成功返回主界面')
      },
      fail: function(err) {
        console.log('返回主界面失败', err)
        // 如果navigateBack失败，尝试重定向
        wx.redirectTo({
          url: '/pages/index/index'
        })
      }
    })
  }
}) 