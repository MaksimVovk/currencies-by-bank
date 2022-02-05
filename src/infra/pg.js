const environment = process.env.NODE_ENV || 'production'
const config = require('../../etc/postgres/knexfile')[environment];
module.exports = require('knex')(config);