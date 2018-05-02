/* @flow */

/*::
  import type { StationPage } from '../types'

  export type Data = {
    allSitePage: {
      edges: Array<Edge>
    }
  }

  export type Edge = {
    node: {
      context: any,
      path: string
    }
  }
*/

/**
 * Returns stations as pages.
 *
 * A page has `{ path, title, href, soundcloudURL }`.
 */

export function getStations (data /*: Data */) /*: Array<StationPage> */ {
  const edges = data && data.allSitePage && data.allSitePage.edges
  if (!edges) throw new Error('getStations(): no pages')
  return edges.filter(isStationEdge).map(edgeToStationPage)
}

function isStationEdge (edge /*: Edge */) {
  return (
    edge.node &&
    edge.node.context &&
    edge.node.path &&
    edge.node.context.title &&
    edge.node.path !== '/'
  )
}

function edgeToStationPage (edge /*: Edge */) {
  return { path: edge.node.path, ...edge.node.context }
}
