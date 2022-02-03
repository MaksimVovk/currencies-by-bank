const { Router } = require('express')
const checkAuth = require('./middleware/check-auth')

const getExchangeRatesByRange = require('../../features/get-exchange-rates-by-range')

const router = module.exports = Router()

router.post('/exchange-rates-by-range', checkAuth, async (req, res, next) => {
  try {
    const body = req.body
    const result = await getExchangeRatesByRange(body, res)
    res.send(result)
  } catch (error) {
    next(error)
  }
})
