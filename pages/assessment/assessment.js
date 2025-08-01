const app = getApp();
const { fetchQuestions } = require('../../utils/questions');
const { sendToAI } = require('../../utils/ai.js');

// Map assessment type to title for navigation bar display
const TITLE_MAP = {
  body: '身体测评',
  career: '事业测评',
  love: '姻缘测评',
  psychology: '心理测评'
};

Page({
  data: {
    type: '',
    questionBank: [],
    questions: [],
    currentIndex: 0,
    answers: [],
    finished: false,
    progress: '1/5',
    title: ''
  },

  /**
   * Lifecycle method--Called when page load
   * options: { type: string }
   */
  onLoad(options) {
    // Redirect if user information is missing
    if (!app.globalData.userInfo) {
      wx.redirectTo({ url: '/pages/userInfo/userInfo' });
      return;
    }

    const type = options.type || 'body';
    this.setData({ type, title: TITLE_MAP[type] || '测评' });

    fetchQuestions(type)
      .then((bank) => {
        // Shuffle questions and select first 5
        const shuffled = [...bank].sort(() => Math.random() - 0.5);
        const questions = shuffled.slice(0, 5);

        this.setData({ questionBank: bank, questions });
        this.updateProgress();
      })
      .catch((err) => {
        console.error(`Error at assessment ${type} onLoad fetchQuestions:`, err);
      });
  },

  onShow() {
    wx.setNavigationBarColor({ backgroundColor: '#ffffff', frontColor: '#000000' });
  },

  updateProgress() {
    const total = this.data.questions.length;
    const index = this.data.currentIndex + 1;
    this.setData({ progress: `${index} / ${total}` });
  },

  selectOption(e) {
    const index = e.currentTarget.dataset.index;
    const { answers, currentIndex, questions } = this.data;
    answers[currentIndex] = index;

    if (currentIndex + 1 >= questions.length) {
      // All questions answered
      this.setData({ answers, finished: true });

      // Preparing POST request body (data) to backend
      const payload = {
        userInfo: app.globalData.userInfo,
        type: this.data.type,
        responses: questions.map((q, i) => ({
          question: q.question,
          // Include the selected option text and its index for clarity
          answerIndex: answers[i],
          answerText: q.options[answers[i]]
        }))
      };

      // Send answers to backend and navigate to result page when done
      wx.showLoading({ title: '分析中...' });

      sendToAI(payload).then((res) => {
        console.log('AI Response', res);

        // Store result for display on result page
        app.globalData.aiResult = res.result || '暂无分析结果...';

        wx.hideLoading();

        wx.navigateTo({
          url: '/pages/result/result',
        });
      }).catch((err) => {
        wx.hideLoading();
        wx.showToast({
          title: '提交失败',
          icon: 'error'
        });
        console.log('Error sending to AI: ', err);
      });
    } else {
      this.setData({ answers, currentIndex: currentIndex + 1 });
      this.updateProgress();
    }
  },

  onBack() {
    wx.navigateBack({ delta: 1 });
  },

  goHome() {
    wx.reLaunch({ url: '/pages/index/index' });
  }
});