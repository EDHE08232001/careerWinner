const app = getApp()
const { getScores, calculateComprehensive } = require('../../utils/score')

Page({
  data: {
    score: 0,
    bodyScore: null,
    careerScore: null,
    loveScore: null,
    psychologyScore: null,
    bodyPercent: null,
    careerPercent: null,
    lovePercent: null,
    psychologyPercent: null
  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://developers.weixin.qq.com/miniprogram/dev/devtools/minicode.html')
  },
  onShow() {
    // Redirect to userinfo page if not verified
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/userInfo/userInfo'
      })
      return
    }
    const scores = getScores()
    const comp = calculateComprehensive(scores)

    this.setData({
      score: comp,
      bodyScore: scores.body ? scores.body.score : null,
      careerScore: scores.career ? scores.career.score : null,
      loveScore: scores.love ? scores.love.score : null,
      psychologyScore: scores.psychology ? scores.psychology.score : null,
      bodyPercent: scores.body ? scores.body.percent : null,
      careerPercent: scores.career ? scores.career.percent : null,
      lovePercent: scores.love ? scores.love.percent : null,
      psychologyPercent: scores.psychology ? scores.psychology.percent : null
    })
  }
})
