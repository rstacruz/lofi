/**
 * Returns pages.
 *
 * A page has `{ path, title, href, soundcloudURL }`.
 */

export function getStations (data) {
  const edges = data && data.allSitePage && data.allSitePage.edges
  if (!edges) throw new Error('getStations(): no pages')
  return (
    edges
      // Ensure it's a station kind of edge
      // Be sure to exclude the homepage
      .filter(
        edge =>
          edge.node &&
          edge.node.context &&
          edge.node.path &&
          edge.node.context.title &&
          edge.node.path !== '/'
      )
      // Convert to page
      .map(edge => ({ path: edge.node.path, ...edge.node.context }))
  )
}
