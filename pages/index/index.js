const app = getApp()

Page({
  data: {
    // Example score, change this dynamically as needed
  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://developers.weixin.qq.com/miniprogram/dev/devtools/minicode.html')
  },
  onShow() {
    // Redirect to userinfo page if not verified
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/userInfo/userInfo',
      })
    }
  }
})
