const { Router } = require('express')
const getBanks = require('../../features/get-banks')
const checkAuth = require('./middleware/check-auth')

const router = module.exports = Router()

router.post('/bank-list', checkAuth, async (req, res, next) => {
  try {
    const banks = await getBanks()
    res.send(banks)
  } catch (error) {
    next(error)
  }
})
