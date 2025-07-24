Page({
  data: {
    questions: [
      { question: '问题1：你喜欢什么颜色？', options: ['红色', '蓝色', '绿色', '黄色'] },
      { question: '问题2：你常锻炼吗？', options: ['每天', '每周', '偶尔', '从不'] },
      { question: '问题3：你喜欢哪种音乐？', options: ['流行', '摇滚', '古典', '电子'] },
      { question: '问题4：你更喜欢早起还是晚睡？', options: ['早起', '晚睡', '都行', '看情况'] },
      { question: '问题5：你喜欢的食物类型？', options: ['中餐', '西餐', '日料', '其他'] },
      { question: '问题6：你平时的压力大吗？', options: ['很大', '一般', '较小', '几乎没有'] },
      { question: '问题7：周末你通常做什么？', options: ['宅家', '运动', '学习', '聚会'] },
      { question: '问题8：你是否喜欢阅读？', options: ['非常喜欢', '偶尔', '很少', '不喜欢'] },
      { question: '问题9：你会定期旅行吗？', options: ['每年多次', '一年一次', '几年一次', '从不'] },
      { question: '问题10：你的理想工作环境？', options: ['稳定', '高薪', '有挑战', '自由'] },
      { question: '问题11：你更看重哪方面？', options: ['家庭', '事业', '健康', '财富'] },
      { question: '问题12：你是否经常熬夜？', options: ['经常', '偶尔', '很少', '从不'] },
      { question: '问题13：你喜欢团队还是独立工作？', options: ['团队', '独立', '均可', '不确定'] },
      { question: '问题14：你是否喜欢宠物？', options: ['非常喜欢', '一般', '不太喜欢', '讨厌'] },
      { question: '问题15：你对未来充满信心吗？', options: ['非常', '一般', '不确定', '没有'] }
    ],
    currentIndex: 0,
    answers: [],
    finished: false,
    progress: '1/15'
  },

  onLoad() {
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
      this.setData({ answers, finished: true })
    } else {
      this.setData({ answers, currentIndex: currentIndex + 1 })
      this.updateProgress()
    }
  },

  onBack() {
    wx.navigateBack({ delta: 1 })
  }
})