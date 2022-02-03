const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers['x-auth-token'] || req.query.token || req.body.token
    jwt.verify(process.env.JWT_TOKEN, token)
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Auth faild'
    })
  }
}