// Utility to fetch questions from cloud service
// Still Incomplete, back needed

// mock API, later save this to env or make it secrets
const API_URL = 'https://example.com/api/questions'

function fetchQuestions(type) {
  return Promise((resolve, reject) => {
    wx.request({
      url: API_URL,
      method: 'POST',
      data: { type },
      success(res) {
        if (res.statusCode === 200 && res.data && Array.isArray(res.data.questions)) {
          resolve(res.data.questions)
        } else {
          reject(res.data || res.errMsg || 'Invalid Response')
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  fetchQuestions
}