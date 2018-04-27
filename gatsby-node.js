const root = require('path').resolve.bind(null, __dirname)

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
 * Pages
 */

const PAGES = {
  '/lofi-hiphop': {
    default: true,
    title: 'Lofi Beats',
    href: 'https://soundcloud.com/parzival6/sets/lo-fi-hip-hop',
    soundcloudURL: 'https://api.soundcloud.com/playlists/246258956'
  },
  '/timewriter': {
    title: 'Lazy Sundays',
    href: 'https://soundcloud.com/jessinneijts/sets/timewriter-lazy-sundays',
    soundcloudURL: 'https://api.soundcloud.com/playlists/109759947'
  }
  // '/deep-house-space': {
  //   title: 'Deep House Space',
  //   href: 'https://soundcloud.com/deephousespace/sets/deep-house'
  // }
}

/**
 * Dynamically create pages
 */

exports.createPages = ({ boundActionCreators }) => {
  const PlayerTemplate = root('src/templates/PlayerTemplate.js')
  const { createPage } = boundActionCreators

  Object.keys(PAGES).map((path /*: string */) => {
    const page = PAGES[path]
    createPage({
      path: path,
      context: page,
      component: PlayerTemplate
    })
  })

  // A homepage
  createPage({
    path: '/',
    context: PAGES['/lofi-hiphop'],
    component: PlayerTemplate
  })
}
