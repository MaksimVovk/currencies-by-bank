const { Router } = require('express')
const getExchangeRatesByRange = require('../../features/get-exchange-rates-by-range')

const router = module.exports = Router()

router.post('/exchange-rates-by-range', async (req, res, next) => {
  try {
    const body = req.body
    const result = await getExchangeRatesByRange(body)
    res.send(result)
  } catch (error) {
    next(error)
  }
})
