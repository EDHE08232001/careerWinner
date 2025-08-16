Page({
  data: {
    heightRankings: [],
    incomeRankings: [],
    hasData: false
  },

  onLoad() {
    this.loadRankings();
  },

  onShow() {
    this.loadRankings();
  },

  loadRankings() {
    const rankings = wx.getStorageSync('userRankings') || [];
    
    if (rankings.length === 0) {
      this.setData({
        heightRankings: [],
        incomeRankings: [],
        hasData: false
      });
      return;
    }
    
    // 分离身高和收入数据，显示所有有数据的用户
    const heightData = rankings
      .filter(item => item.height > 0)
      .map(item => ({
        ...item,
        score: this.calculateHeightScore(item.height),
        percentile: this.getHeightPercentile(item.height)
      }))
      .sort((a, b) => b.score - a.score); // 按分数排序

    const incomeData = rankings
      .filter(item => item.income > 0)
      .map(item => ({
        ...item,
        score: this.calculateIncomeScore(item.income),
        percentile: this.getIncomePercentile(item.income)
      }))
      .sort((a, b) => b.score - a.score); // 按分数排序

    this.setData({
      heightRankings: heightData,
      incomeRankings: incomeData,
      hasData: heightData.length > 0 || incomeData.length > 0
    });
  },

  calculateHeightScore(height) {
    if (height < 160) return 10;
    if (height < 169.7) return 30;
    if (height < 175) return 50;
    if (height < 180) return 70;
    return 90;
  },

  calculateIncomeScore(income) {
    if (income < 800) return 10;
    if (income < 1800) return 30;
    if (income < 2800) return 50;
    if (income < 4500) return 70;
    return 90;
  },

  getHeightPercentile(height) {
    if (height < 160) return '矮小症筛查阈值';
    if (height < 169.7) return '低于全国平均';
    if (height < 175) return '平均身高区间';
    if (height < 180) return '略高于平均身高';
    return '高个子人群';
  },

  getIncomePercentile(income) {
    if (income < 800) return '低收入组';
    if (income < 1800) return '中间偏下收入组';
    if (income < 2800) return '中间收入组';
    if (income < 4500) return '中间偏上收入组';
    return '高收入组';
  },

  goHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  }
}); 