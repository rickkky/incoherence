
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./incoherence.cjs.production.min.js')
} else {
  module.exports = require('./incoherence.cjs.development.js')
}
