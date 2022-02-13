const Joi = require('joi')
const pg = require('../infra/pg')

const schema = Joi.object({
  start_date: Joi.date().iso().required(),
  end_date: Joi.date().iso().required(),
  bank_id: Joi.number().integer().required()
})

module.exports = function (params, res) {
  const { error } = schema.validate(params)

  if (error) {
    res.status(400).send({ message: 'Invalid data', errors: error.details })
  }

  return pg('exchange_currencies as e')
    .select(
      'e.bay',
      'e.sale',
      pg.raw('e.date::text'),
      'b.name as bank_name',
      'b.id as bank_id',
      'c.name as currency'
    )
    .leftJoin('banks as b', 'b.id', 'e.bank_id')
    .leftJoin('currencies as c', 'c.id', 'e.currency_id')
    .where({
      'b.id': params.bank_id,
    })
    .whereBetween('e.date', [params.start_date, params.end_date])
    .orderByRaw('date, bank_id')
}
