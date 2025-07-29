/**
 * AI Backend Communication Helper
 * 
 * Right now it sends user's answred questions and picked choiced to backend abd has them printed
 * then a signal from backend is printed
 */

 // End point of the AI backend
const AI_API_URL = 'https://career-winner-backend-EDHE.replit.app/ai';

 /**
  * Send assessment answers to the AI backend
  * 
  * @param {Object} payload - Data to send to the backend. Typically includes the assessment tyoe,
  * the selected answers and optional user info.
  * 
  * @returns {Promise<Object>} Resolves with the backend response data.
  */
function sendToAI(payload) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: AI_API_URL,

      method: 'POST',

      header: {
        'Content-Type': 'application/json'
      },

      data: payload,

      success: (res) => {
        resolve(Res.data);
      },

      fail: (err) => {
        reject('Request failed: ' + err.errMsg);
      }
    });
  });
}

module.exports = {
  sendToAI
}