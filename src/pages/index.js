/* global graphql */
import React from 'react'
import IndexPage from '../components/IndexPage'

/**
 * Template for the home page.
 */

export const IndexTemplate = props => {
  // Happened on a `gatsby build`, no idea why though!
  console.log(JSON.stringify(props, null, 2))

  const edges = props.data.allSitePage.edges
  const pages = getPageNodes(edges)

  return (
    <div>
      <IndexPage {...{ pages }} />
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
    </div>
  )
}

/**
 * Returns pages.
 *
 * A page has `{ path, title, href, soundcloudURL }`.
 */

function getPageNodes (edges) {
  return edges
    .filter(
      edge =>
        edge.node &&
        edge.node.context &&
        edge.node.path &&
        edge.node.context.title
    )
    .map(edge => ({ path: edge.node.path, ...edge.node.context }))
}

/*
 * Export
 */

export default IndexTemplate

/*
 * GraphQL query to pull all stations.
 */

export const pageQuery = graphql`
  query IndexPageQuery {
    allSitePage {
      edges {
        node {
          id
          path
          layout
          context {
            title
            href
            soundcloudURL
          }
        }
      }
    }
  }
`
