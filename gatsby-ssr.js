import React from 'react'
import { Provider } from 'unstated'
import { renderToString } from 'react-dom/server'

/**
 * Hook unstated's `<Provider>` into the React tree.
 *
 * See: https://github.com/gatsbyjs/gatsby/blob/master/examples/using-redux/gatsby-ssr.js
 */

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  const ConnectedBody = () => <Provider>{bodyComponent}</Provider>
  replaceBodyHTMLString(renderToString(<ConnectedBody />))
}
