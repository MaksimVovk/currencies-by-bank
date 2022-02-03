const environment = process.env.NODE_ENV || 'production'
const config = require('../../../etc/postgres/knexfile.js')[environment]

module.exports = require('knex')(config)