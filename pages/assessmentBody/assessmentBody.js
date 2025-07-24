const app = getApp()
const {sendToAI} = require('../../utils/ai')

Page({
  data: {
    // Question bank of 100 placeholder questions
    questionBank: Array.from({ length: 100 }, (_, i) => ({
      question: `问题${i + 1}: 示例题目${i + 1}`,
      options: ['选项A', '选项B', '选项C', '选项D']
    })),
    questions: [],
    currentIndex: 0,
    answers: [],
    finished: false,
    progress: '1/15'
  },

  onLoad() {
    if (!app.globalData.userInfo) {
      wx.redirectTo({
        url: '/pages/userInfo/userInfo'
      })
      return
    }
    const shuffled = [...this.data.questionBank].sort(() => Math.random - 0.5)
    const questions = shuffled.slice(0, 15)
    this.setData({ questions })
    this.updateProgress()
  },

  onShow() {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff'
    })
  },


  updateProgress() {
    const total = this.data.questions.length
    const index = this.data.currentIndex + 1
    this.setData({ progress: `${index}/${total}` })
  },

  selectOption(e) {
    const value = e.currentTarget.dataset.value
    const { answers, currentIndex, questions } = this.data
    answers[currentIndex] = value
    if (currentIndex + 1 >= questions.length) {
      this.setData({ answers, finished: true })

      // send data to the (mock) AI service
      sendToAI({ type: 'body', answers, userInfo: app.globalData.userInfo })
    } else {
      this.setData({ answers, currentIndex: currentIndex + 1 })
      this.updateProgress()
    }
  },

  onBack() {
    wx.navigateBack({ delta: 1 })
  }
})