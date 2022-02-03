const { Router } = require('express')
const getBankExchangeRatesByBank = require('../../features/get-bank-exchange-rates-by-date')

const router = module.exports = Router()

router.post('/exchange-rates', async (req, res, next) => {
  try {
    const body = req.body
    const result = await getBankExchangeRatesByBank(body)
    res.send(result)
  } catch (error) {
    next(error)
  }
})
