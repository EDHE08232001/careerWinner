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
    
    // 只显示最新的数据（最后一条记录）
    const latestRanking = rankings[rankings.length - 1];
    
    if (!latestRanking) {
      this.setData({
        heightRankings: [],
        incomeRankings: [],
        hasData: false
      });
      return;
    }
    
    // 分离身高和收入数据，只显示最新用户的数据
    const heightData = latestRanking.height > 0 ? [{
      ...latestRanking,
      score: this.calculateHeightScore(latestRanking.height),
      percentile: this.getHeightPercentile(latestRanking.height)
    }] : [];

    const incomeData = latestRanking.income > 0 ? [{
      ...latestRanking,
      score: this.calculateIncomeScore(latestRanking.income),
      percentile: this.getIncomePercentile(latestRanking.income)
    }] : [];

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