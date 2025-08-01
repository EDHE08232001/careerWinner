const app = getApp();

Page({
  data: {
    result: ''
  },

  onLoad() {
    this.setData({
      // Use global data to retrieve data AI analysis result
      result: app.globalData.aiResult || '暂无结果'
    });
  },

  goHome() {
    wx.reLaunch({
      url: '/pages/index/index',
    });
  }
});