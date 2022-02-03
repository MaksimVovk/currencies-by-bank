const { Router } = require('express')
const checkAuth = require('./middleware/check-auth')

const getBankExchangeRatesByBank = require('../../features/get-bank-exchange-rates-by-date')

const router = module.exports = Router()

router.post('/exchange-rates', checkAuth, async (req, res, next) => {
  try {
    const body = req.body
    const result = await getBankExchangeRatesByBank(body, res)
    res.send(result)
  } catch (error) {
    next(error)
  }
})
