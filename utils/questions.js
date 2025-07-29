const app = getApp();
const API_URL = "https://886edec9-5ffe-46e6-a680-af3625c500e3-00-8yrs0pqhalx2.kirk.replit.dev/questions"; // currently deployed on git

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
