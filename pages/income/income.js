// pages/income/income.js
Page({
  data: {
    income: '',
    incomeGroup: '',
    incomePercentile: 0,
    showResult: false,
    incomeGroups: [
      { name: '低收入', range: '≤795元', threshold: 795 },
      { name: '中低收入', range: '796-1800元', threshold: 1800 },
      { name: '中等收入', range: '1801-2827元', threshold: 2827 },
      { name: '中高收入', range: '2828-4447元', threshold: 4447 },
      { name: '高收入', range: '≥4448元', threshold: Infinity }
    ]
  },

  onLoad: function(options) {
    console.log('收入评估页面加载')
  },
  
  onShow() {
    // 设置自定义导航栏按钮
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff'
    })
  },

  inputIncome: function(e) {
    this.setData({
      income: e.detail.value
    });
  },

  calculateIncome: function() {
    const income = parseFloat(this.data.income);
    
    if (isNaN(income) || income <= 0) {
      wx.showToast({
        title: '请输入有效收入',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // Determine income group based on 2024 China National Bureau of Statistics data
    let incomeGroup = '';
    let highlightIndex = -1;
    
    if (income <= 795) {
      incomeGroup = '低收入';
      highlightIndex = 0;
    } else if (income <= 1800) {
      incomeGroup = '中低收入';
      highlightIndex = 1;
    } else if (income <= 2827) {
      incomeGroup = '中等收入';
      highlightIndex = 2;
    } else if (income <= 4447) {
      incomeGroup = '中高收入';
      highlightIndex = 3;
    } else {
      incomeGroup = '高收入';
      highlightIndex = 4;
    }

    // Calculate percentile (simplified calculation)
    let incomePercentile = 0;
    if (income <= 795) {
      incomePercentile = (income / 795) * 20;
    } else if (income <= 1800) {
      incomePercentile = 20 + ((income - 795) / (1800 - 795)) * 20;
    } else if (income <= 2827) {
      incomePercentile = 40 + ((income - 1800) / (2827 - 1800)) * 20;
    } else if (income <= 4447) {
      incomePercentile = 60 + ((income - 2827) / (4447 - 2827)) * 20;
    } else {
      incomePercentile = 80 + Math.min(((income - 4447) / 5553), 1) * 20; // Cap at 100%
    }

    // Update income groups with highlight
    const updatedIncomeGroups = this.data.incomeGroups.map((group, index) => {
      return {
        ...group,
        highlight: index === highlightIndex
      };
    });

    this.setData({
      incomeGroup: incomeGroup,
      incomePercentile: incomePercentile.toFixed(1),
      showResult: true,
      incomeGroups: updatedIncomeGroups
    });
  },

  resetCalculation: function() {
    this.setData({
      income: '',
      incomeGroup: '',
      incomePercentile: 0,
      showResult: false,
      incomeGroups: this.data.incomeGroups.map(group => ({...group, highlight: false}))
    });
  },

  onBack: function() {
    // 如果在结果页面，返回到输入页面
    if (this.data.showResult) {
      this.resetCalculation();
      return;
    }
    
    // 如果在输入页面，返回到上一级页面
    console.log('返回上一级页面');
    wx.navigateBack({
      delta: 1,
      success: function() {
        console.log('成功返回上一级页面')
      },
      fail: function(err) {
        console.log('返回上一级页面失败', err)
        // 如果navigateBack失败，尝试重定向
        wx.redirectTo({
          url: '/pages/career/career'
        })
      }
    });
  }
}) 