// pages/career/career.js
Page({
  data: {
    showIncome: false,
    income: 0,
    incomeGroup: '',
    incomePercentile: 0
  },

  onLoad: function(options) {
    console.log('事业测评页面加载')
  },
  
  onShow() {
    // 设置自定义导航栏按钮
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff'
    })
  },

  navigateToIncome: function() {
    wx.navigateTo({
      url: '/pages/income/income'
    });
  },

  onBack: function() {
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