const pg = require('../infra/pg')

module.exports = function () {
  return pg('banks').orderBy('id')
}
