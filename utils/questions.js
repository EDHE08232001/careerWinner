const app = getApp();
const API_BASE_URL = 'https://career-winner-backend-ysys1213mc.replit.app';
const API_URL = `${API_BASE_URL}/questions`; // Replit server

// 测试API连接
function testAPIConnection() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${API_BASE_URL}/`,
      method: "GET",
      success: (res) => {
        console.log("API连接测试成功:", res);
        resolve(res);
      },
      fail: (err) => {
        console.error("API连接测试失败:", err);
        reject(err);
      }
    });
  });
}

function fetchQuestions(type) {
  return new Promise((resolve, reject) => {
    // 先测试连接
    testAPIConnection()
      .then(() => {
        // 连接成功，继续请求问题
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
      })
      .catch((err) => {
        console.error("API连接失败，尝试直接请求问题:", err);
        // 如果连接测试失败，尝试直接请求问题
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
  });
}

module.exports = {
  fetchQuestions,
  testAPIConnection
};
