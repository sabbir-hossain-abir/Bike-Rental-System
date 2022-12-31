if (typeof window !== 'undefined' && typeof window.alert === 'function') {
  module.exports = window.alert
} else {
  module.exports = require('./node')
}
