const app = getApp()

Page({
  data: {
    phone: '',
    email: '',
    phoneValid: false,
    emailValid: false
  },

  onLoad() {},

  onPhoneInput(e) {
    const phone = e.detail.value
    const phoneValid = /^1\d{10}$/.test(phone)
    this.setData({ phone, phoneValid })
  },

  onEmailInput(e) {
    const email = e.detail.value
    const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
    this.setData({ email, emailValid })
  },

  submit() {
    const { phoneValid, emailValid, phone, email } = this.data
    if (!phoneValid || !emailValid) {
      wx.showToast({ title: '信息格式有误', icon: 'none' })
      return
    }
    const info = { phone, email }
    wx.setStorageSync('userInfo', info)
    app.globalData.userInfo = info
    wx.showToast({ title: '验证通过', icon: 'success' })
    setTimeout(() => {
      wx.navigateBack({ delta: 1 })
    }, 1000)
  }
})