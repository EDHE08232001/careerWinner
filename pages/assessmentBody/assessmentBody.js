const app = getApp();

const { fetchQuestions } = require('../../utils/questions');

const type = "body";

Page({
  data: {
    questionBank: [],
    questions: [],
    currentIndex: 0,
    answers: [],
    finished: false,
    progress: "1/5" // changed to 5 questions per assessment
  },

  onLoad() {
    if (!app.globalData.userInfo) {
      wx.redirectTo({
        url: '/pages/userInfo/userInfo',
      });
      return;
    }

    fetchQuestions(type).then(bank => {
      const shuffled = [...bank].sort(() => Math.random() - 0.5);
      const questions = shuffled.slice(0, 5); // choose 5 random questions

      this.setData({
        questionBank: bank,
        questions
      });

      this.updateProgress();
    }).catch(err => {
      console.error(`Error at ${type} onLoad fetchQuestions. Error Message: `, err);
    });
  },

  onShow() {
    wx.setNavigationBarColor({
      backgroundColor: '#ffffff',
      frontColor: '#000000',
    });
  },

  updateProgress() {
    const total = this.data.questions.length;
    const index = this.data.currentIndex + 1;
    this.setData({
      progress: `${index} / ${total}`
    });
  },

  selectOption(e) {
    const index = e.currentTarget.dataset.index;
    const { answers, currentIndex, questions } = this.data;

    answers[currentIndex] = index;

    if (currentIndex + 1 >= questions.length) {
      // finish without calculating score or percent. (for current development, will implement later)

      this.setData({
        answers,
        finished: true
      });
    } else {
      this.setData({ answers, currentIndex: currentIndex + 1 });

      this.updateProgress();
    }
  },

  onBack() {
    wx.navigateBack({
      delta: '1',
    });
  },

  goHome() {
    wx.reLaunch({
      url: '/pages/index/index',
    });
  }
});