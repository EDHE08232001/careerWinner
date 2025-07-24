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
    progress: '1/15',
    aiPercent: null
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
      // calculate scaled score when finished
      const total = answer.reduce((sum, v) => sum + Number(v), 0)
      const score = Math.round(total / (questions.length * 4) * 100)

      // Send answers and questions to the mock AI service
      sendToAI({
        type: 'body',
        questions,
        answers,
        userInfo: app.globalData.userInfo
      }).then(res => {
        const percent = res.percent || 0
        saveScore('body', {score, percent})
        this.setData({ answers, finished: true, aiPercent: percent })
      })
    } else {
      this.setData({ answers, currentIndex: currentIndex + 1 })
      this.updateProgress()
    }
  },

  onBack() {
    wx.navigateBack({ delta: 1 })
  }
})