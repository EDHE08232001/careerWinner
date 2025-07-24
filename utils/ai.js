function sendToAI(payload) {
  return new Promise((resolve) => {
    console.log('Mock AI payload:', payload)
    // Simulate network latency
    setTimeout(() => {
      resolve({ reply: 'Mock evaluation result' })
    }, 500)
  })
}

module.exports = {
  sendToAI
}