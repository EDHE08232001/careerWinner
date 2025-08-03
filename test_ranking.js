// 测试排行榜数据
const testData = [
  {
    name: "高个子用户",
    height: 184,
    income: 0,
    totalScore: 90,
    timestamp: Date.now() - 1000
  },
  {
    name: "高收入用户", 
    height: 0,
    income: 8000,
    totalScore: 90,
    timestamp: Date.now() - 2000
  },
  {
    name: "中等用户",
    height: 175,
    income: 5000,
    totalScore: 120,
    timestamp: Date.now() - 3000
  },
  {
    name: "普通用户",
    height: 170,
    income: 3000,
    totalScore: 80,
    timestamp: Date.now() - 4000
  },
  {
    name: "矮个子用户",
    height: 158,
    income: 0,
    totalScore: 10,
    timestamp: Date.now() - 5000
  },
  {
    name: "低收入用户",
    height: 0,
    income: 600,
    totalScore: 10,
    timestamp: Date.now() - 6000
  }
];

// 在微信小程序控制台运行以下代码来设置测试数据
console.log('设置测试数据...');
wx.setStorageSync('userRankings', testData);
console.log('测试数据已设置，请刷新排行榜页面查看效果'); 