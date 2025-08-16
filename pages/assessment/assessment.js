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
    title: '',
    showHeightInput: false,
    showIncomeInput: false,
    height: '',
    income: '',
    currentStep: 'questions' // 'questions', 'height', 'income'
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
    let total = this.data.questions.length;
    let index = this.data.currentIndex + 1;
    
    // 身体测评和事业测评有额外的输入步骤
    if (this.data.type === 'body' || this.data.type === 'career') {
      total = 6; // 5个问题 + 1个输入步骤
    }
    
    this.setData({ progress: `${index} / ${total}` });
  },

  selectOption(e) {
    const index = e.currentTarget.dataset.index;
    const { answers, currentIndex, questions, type } = this.data;
    answers[currentIndex] = index;

    if (currentIndex + 1 >= questions.length) {
      // All questions answered, check if need additional input
      if (type === 'body') {
        this.setData({ 
          answers, 
          currentStep: 'height',
          showHeightInput: true,
          progress: '6 / 6'
        });
      } else if (type === 'career') {
        this.setData({ 
          answers, 
          currentStep: 'income',
          showIncomeInput: true,
          progress: '6 / 6'
        });
      } else {
        this.completeAssessment();
      }
    } else {
      this.setData({ answers, currentIndex: currentIndex + 1 });
      this.updateProgress();
    }
  },

  onHeightInput(e) {
    this.setData({ height: e.detail.value });
  },

  onHeightConfirm(e) {
    const height = e.detail.value;
    if (!height || height < 100 || height > 250) {
      wx.showToast({
        title: '请输入有效身高(100-250cm)',
        icon: 'none'
      });
      return;
    }
    
    this.setData({ 
      height,
      showHeightInput: false,
      currentStep: 'complete'
    });
    this.completeAssessment();
  },

  onIncomeInput(e) {
    this.setData({ income: e.detail.value });
  },

  onIncomeConfirm(e) {
    const income = e.detail.value;
    if (!income || income < 0 || income > 1000000) {
      wx.showToast({
        title: '请输入有效月收入',
        icon: 'none'
      });
      return;
    }
    
    this.setData({ 
      income,
      showIncomeInput: false,
      currentStep: 'complete'
    });
    this.completeAssessment();
  },

  completeAssessment() {
    const { type, questions, answers, height, income } = this.data;
    
    // Preparing POST request body (data) to backend
    const payload = {
      userInfo: app.globalData.userInfo,
      type: type,
      responses: questions.map((q, i) => ({
        question: q.question,
        answerIndex: answers[i],
        answerText: q.options[answers[i]]
      }))
    };

    // Add height/income data
    if (type === 'body' && height) {
      payload.height = parseInt(height);
    }
    if (type === 'career' && income) {
      payload.income = parseInt(income);
    }
    // 确保身高数据在身体测评中被保存
    if (type === 'body') {
      payload.height = parseInt(height) || 0;
    }

    // Send answers to backend and navigate to result page when done
    wx.showLoading({ title: '分析中...' });

    sendToAI(payload).then((res) => {
      console.log('AI Response', res);

      // Store result for display on result page
      app.globalData.aiResult = res.result || '暂无分析结果...';

      // Calculate and store ranking data
      this.calculateRanking();

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
  },

  calculateRanking() {
    const { type, height, income } = this.data;
    const userInfo = app.globalData.userInfo;
    
    if (!userInfo) return;

    let heightPercentile = '';
    let incomePercentile = '';
    let totalScore = 0;

    // Calculate height percentile
    if (height) {
      const heightNum = parseInt(height);
      if (heightNum < 160) {
        heightPercentile = 'P3以下 (矮小症筛查阈值)';
        totalScore += 10;
      } else if (heightNum < 169.7) {
        heightPercentile = 'P3-P25 (低于全国平均)';
        totalScore += 30;
      } else if (heightNum < 175) {
        heightPercentile = 'P25-P77.6 (平均身高区间)';
        totalScore += 50;
      } else if (heightNum < 180) {
        heightPercentile = 'P77.6-P92.6 (北方省份常见)';
        totalScore += 70;
      } else {
        heightPercentile = 'P92.6以上 (高个子人群)';
        totalScore += 90;
      }
    }

    // Calculate income percentile
    if (income) {
      const incomeNum = parseInt(income);
      if (incomeNum < 800) {
        incomePercentile = '低收入组 (月均795元)';
        totalScore += 10;
      } else if (incomeNum < 1800) {
        incomePercentile = '中间偏下收入组 (月均1,800元)';
        totalScore += 30;
      } else if (incomeNum < 2800) {
        incomePercentile = '中间收入组 (月均2,827元)';
        totalScore += 50;
      } else if (incomeNum < 4500) {
        incomePercentile = '中间偏上收入组 (月均4,447元)';
        totalScore += 70;
      } else {
        incomePercentile = '高收入组 (月均8,234元)';
        totalScore += 90;
      }
    }

    // Store ranking data
    const rankingData = {
      name: userInfo.name || userInfo.phone || '匿名用户',
      height: height || 0,
      heightPercentile: heightPercentile,
      income: income || 0,
      incomePercentile: incomePercentile,
      totalScore: totalScore,
      timestamp: new Date().getTime()
    };

    // Get existing rankings and add new one
    const existingRankings = wx.getStorageSync('userRankings') || [];
    existingRankings.push(rankingData);
    
    // Sort by total score (descending)
    existingRankings.sort((a, b) => b.totalScore - a.totalScore);
    
    // Keep only top 100
    const topRankings = existingRankings.slice(0, 100);
    
    wx.setStorageSync('userRankings', topRankings);
  },

  onBack() {
    wx.navigateBack({ delta: 1 });
  },

  goHome() {
    wx.reLaunch({ url: '/pages/index/index' });
  }
});