const app = getApp()
const { sendToAI } = require('../../utils/ai')
const { saveScore } = require('../../utils/score')
const { fetchQuestions } = require('../../utils/questions')

Page({
  data: {
    questionBank: [],
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

    fetchQuestions('love').then(bank => {
      const shuffled = [...bank].sort(() => Math.random() - 0.5)
      const questions = shuffled.slice(0, 15)
      this.setData({ questionBank: bank, questions })
      this.updateProgress()
    }).catch(err => {
      console.err('Filed to load questions', err)
    })
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
      const total = answers.reduce((sum, v) => sum + Number(v), 0)
      const score = Math.round(total / (questions.length * 4) * 100)

      // Send answers and questions to the mock AI service
      sendToAI({
        type: 'love',
        questions,
        answers,
        userInfo: app.globalData.userInfo
      }).then(res => {
        const percent = res.percent || 0
        saveScore('love', {score, percent})
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