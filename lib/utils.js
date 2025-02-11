async function withWrapLoading(fn, message = 'loading...', ...args) {
  const ora = require('ora')
  const spinner = ora(message).start()
  try {
    const result = await fn(...args)
    spinner.succeed()
    return result
  } catch (error) {
    spinner.fail('Request failed, please try again ...')
  }
}



module.exports = {
  // 休眠
  sleep(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  },

  withWrapLoading
}
