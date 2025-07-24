function saveScore(type, data) {
  const scores = wx.getStorageSync('scores') || {}
  scores[type] = data
  wx.setStorageSync('scores', scores)
  const app = getApp ? getApp(): null

  if (app && app.globalData) {
    app.globalData.scores = scores
  }
}

function getScores() {
  return wx.getStorageSync('scores') || {}
}

function calculateComprehensive(scores) {
  const values = Object.values(scores).map(v => v.scores)

  if (!values.length) {
    return 0
  }

  const total = values.reduce((sum, v) => sum + v, 0)

  return Math.round(total / values.length)
}

module.exports = {
  saveScore,
  getScores,
  calculateComprehensive
}