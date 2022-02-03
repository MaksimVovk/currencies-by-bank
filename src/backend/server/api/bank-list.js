const { Router } = require('express')
const getBanks = require('../../features/get-banks')

const router = module.exports = Router()

router.post('/bank-list', async (req, res, next) => {
  try {
    const banks = await getBanks()
    res.send(banks)
  } catch (error) {
    next(error)
  }
})
