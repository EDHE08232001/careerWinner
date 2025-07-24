function sendToAI(payload) {
  return new Promise((resolve) => {
    console.log('Mock AI payload:', payload)
    // Simulate network latency and returns fake percentiles
    setTimeout(() => {
      const percent = Math.round(Math.random() * 50) + 50
      resolve({
        reply: `超过了国内${percent}%的人`,
        percent
      })
    }, 500)
  })
}

module.exports = {
  sendToAI
}