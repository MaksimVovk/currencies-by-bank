module.exports = {
  configureWebpack: config => {
    config.entry.app = `${__dirname}/src/front/index.js`
    config.output.filename = '[name].[hash:8].js'
    config.resolve.modules.push(`${__dirname}/src`)

    config.resolve.extensions = ['.scss', '.vue', '.js']
    config.devServer = { contentBase: `${__dirname}/src/front/public` }
    config.devtool = 'eval-source-map'
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].template = `${__dirname}/src/front/public/index.html`
        return args
      })
    config.module
      .rule('scss')
      .oneOf('vue')
      .use('resolve-url-loader')
      .loader('resolve-url-loader').options({ keepQuery: true })
      .before('sass-loader')
    config.module
      .rule('scss')
      .oneOf('vue')
      .use('sass-loader')
      .loader('sass-loader')
      .tap(options => ({
        ...options,
        sourceMap: true,
        sourceMapContents: false
      }))
  },
  devServer: {
     headers: {
      'X-Frame-Options': 'sameorigin'
    }
  },
  filenameHashing: true,
}
