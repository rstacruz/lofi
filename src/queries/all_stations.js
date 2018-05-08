/* @flow */

import type { Station, StationPage } from '../types'

export type Edge = {
  node: {
    context: {} | Station,
    path: string
  }
}

export type Data = {
  allSitePage: {
    edges: Array<Edge>
  }
}

/**
 * Returns stations as pages.
 *
 * A page has `{ path, title, href, soundcloudURL }`.
 */

export function getStations (data: Data): Array<StationPage> {
  const edges = data && data.allSitePage && data.allSitePage.edges
  if (!edges) throw new Error('getStations(): no pages')
  return edges.filter(isStationEdge).map(edgeToStationPage)
}

/**
 * Checks if a given edge represents a station
 */

function isStationEdge (edge: Edge) {
  return (
    edge.node &&
    edge.node.path &&
    edge.node.context &&
    edge.node.context.title &&
    edge.node.path !== '/'
  )
}

function edgeToStationPage (edge: Edge) {
  return { path: edge.node.path, ...edge.node.context }
}
