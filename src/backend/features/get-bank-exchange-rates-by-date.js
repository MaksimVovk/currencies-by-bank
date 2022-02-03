const pg = require('../infra/pg')

module.exports = function (params) {
  return pg('exchange_currencies as e')
    .select(
      'e.bay',
      'e.sale',
      pg.raw("e.date::text"),
      'b.name as bank_name',
      'b.id as bank_id',
      'c.name as currency'
    )
    .leftJoin('banks as b', 'b.id', 'e.bank_id')
    .leftJoin('currencies as c', 'c.id', 'e.currency_id')
    .where({
      'e.date': params.date,
      'b.id': params.bank_id,
    })
}
