App({
  onLaunch() {
    console.log('App Launched');

    // Load cached user info if exists
    const info = wx.getStorageSync('userInfo')
    if (info) {
      this.globalData.userInfo = info
    }
  },
  globalData: {
    userInfo: null
  }
})
