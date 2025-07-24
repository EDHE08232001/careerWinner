App({
  onLaunch() {
    console.log('App Launched');

    // Load cached user info if exists
    const info = wx.getStorageSync('userinfo')
    if (info) {
      this.globalData.userinfo = info
    }
  },
  globalData: {
    userinfo: null
  }
})
