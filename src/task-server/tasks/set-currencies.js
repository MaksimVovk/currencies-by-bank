const pg = require('../../infra/pg')

module.exports = handler

async function handler ({ data, date, currencyId }) {
  const banksData = await pg('banks')
  const currenciesData = await pg('currencies')

  const banks = banksData.reduce((prev, next) => {
    return ({ ...prev, [next.name]: next.id })
  }, {})

  const currencies = currenciesData.reduce((prev, next) => {
    return ({ ...prev, [next.name]: next.id })
  }, {})

  await removeRows(date, currencyId, currencies)

  const patch = data.map(it => ({
    bay: it.bay,
    sale: it.sale,
    date: it.date,
    currency_id: currencies[it.currency_id],
    bank_id: banks[it.bank_name],
  }))

  if (data && data.length) {
    await pg.batchInsert('exchange_currencies', patch, 100)
  } else {
    console.log('something wrong for date ' + date + ' for currency ' + currencyId) //eslint-disable-line
  }
}

function removeRows (date, currencyId, currencies) {
  return pg('exchange_currencies as e')
    .where({
      'e.date': date,
      'e.currency_id': currencies[currencyId]
    })
    .del()
}