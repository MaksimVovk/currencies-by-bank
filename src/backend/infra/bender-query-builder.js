const fs = require('fs')
const camelcase = require('camelcase')
const { Router } = require('express')

const router = Router()

module.exports = function ({ path }) {

  if (!path) {
    return
  }

  function getModuleName (path) {
    return path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.'))
  }

  const features = fs.readdirSync(path).filter(it => it !== 'index.js').map(it => getModuleName(it))

  function wraperr (fn, rout) {
    return router.all(rout, function (req, res, next) {
      const METHOD = req.method

      if (METHOD === 'GET') {
        const params = req.query.params || req.query
        const fnReturn = fn(params, req, res, next)
        return Promise.resolve(fnReturn).catch(next).then((response) => res.send(response))
      }

      if (METHOD === 'POST') {
        const parsedData = JSON.parse(req.query.data)
        const data = parsedData.params || parsedData

        const fnReturn = fn(data, req, res, next)
        return Promise.resolve(fnReturn).catch(next).then((response) => res.send(response))
      }
    })
  }

  features.forEach(k => {
    const fnObject = require(`${path}/${k}`)

    if (typeof fnObject === 'function') {
      router.use(`/${camelcase(k)}`, wraperr(fnObject))
    } else if (typeof fnObject === 'object') {
      const keys = Object.keys(fnObject)
      keys.forEach(o => {
        const rout = `/${k}.${camelcase(o)}`
        wraperr(fnObject[o], rout)
      })
    }
  })
  return router
}