module.exports = {
  configureWebpack: config => {
    config.entry.app = `${__dirname}/src/front/index.js`
    config.output.filename = '[name].[hash:8].js'
    config.devtool = 'eval-source-map'
  },
}
