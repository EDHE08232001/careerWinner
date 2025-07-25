const app = getApp();
const API_URL = "https://career-winner-backend-EDHE.replit.app/questions"; // Replace with real backend URL

function fetchQuestions(type) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: API_URL,
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      data: {
        type: type
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data.questions);
        } else {
          reject(res.data.error || "服务器错误");
        }
      },
      fail: (err) => {
        reject("网络请求失败: " + err.errMsg);
      }
    });
  });
}

module.exports = {
  fetchQuestions
};
