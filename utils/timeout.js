let timeout = function (delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(1)
      } catch (e) {
        reject(0)
      }
    }, delay);
  })
}

module.exports = timeout;