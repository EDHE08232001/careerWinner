// careerWinner/app.js
App({
  onLaunch() {
    console.log('App Launched');

    // Load cached user info if exists
    const info = wx.getStorageSync('userInfo');
    if (info) {
      this.globalData.userInfo = info;
    }

    // Set the root path
    this.globalData.rootPath = wx.env.USER_DATA_PATH; // You can adjust this path according to your needs
  },
  globalData: {
    userInfo: null,
    rootPath: ''
  }
});
