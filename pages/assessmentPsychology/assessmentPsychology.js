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
    progress: '1/5', // 修改为 5 个问题
    aiPercent: null
  },

  onLoad() {
    if (!app.globalData.userInfo) {
      wx.redirectTo({
        url: '/pages/userInfo/userInfo'
      })
      return
    }

    fetchQuestions('psychology').then(bank => {
      const shuffled = [...bank.questions].sort(() => Math.random() - 0.5)
      const questions = shuffled.slice(0, 5) // 只选取 5 个随机问题
      this.setData({ questionBank: bank, questions })
      this.updateProgress()
    }).catch(err => {
      console.error('Failed to load questions', err)
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
    const index = e.currentTarget.dataset.index;
    const { answers, currentIndex, questions } = this.data;
    answers[currentIndex] = index;
  
    if (currentIndex + 1 >= questions.length) {
      const total = answers.reduce((sum, v) => sum + v, 0);
      const score = Math.round(total / (questions.length * 3) * 100); // max index is 3
  
      sendToAI({
        type: 'psychology',
        questions,
        answers,
        userInfo: app.globalData.userInfo
      }).then(res => {
        const percent = res.percent || 0;
        saveScore('psychology', { score, percent });
        this.setData({ answers, finished: true, aiPercent: percent });
      });
    } else {
      this.setData({ answers, currentIndex: currentIndex + 1 });
      this.updateProgress();
    }
  },

  onBack() {
    wx.navigateBack({ delta: 1 })
  }
})