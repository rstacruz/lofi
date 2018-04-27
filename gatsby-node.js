const root = require('path').resolve.bind(null, __dirname)
const STATIONS = require(root('src/data/stations.js'))

/**
 * See: https://github.com/gatsbyjs/gatsby/issues/2538#issuecomment-356769913
 */

exports.modifyWebpackConfig = ({ config, stage }) => {
  const timestamp = Date.now()
  switch (stage) {
    case 'build-javascript':
      config.merge({
        output: {
          filename: `[name]-${timestamp}-[chunkhash].js`,
          chunkFilename: `[name]-${timestamp}-[chunkhash].js`
        }
      })

      break
  }
  return config
}

/**
 * Dynamically create pages
 */

exports.createPages = ({ boundActionCreators }) => {
  const PlayerTemplate = root('src/templates/PlayerTemplate.js')
  const { createPage } = boundActionCreators

  Object.keys(STATIONS).map((path /*: string */) => {
    const station = STATIONS[path]
    createPage({
      path: path,
      context: station,
      component: PlayerTemplate
    })
  })

  // A homepage
  createPage({
    path: '/',
    context: STATIONS['/lofi-hiphop'],
    component: PlayerTemplate
  })
}
