/* global graphql */
import React from 'react'
import IndexPage from '../components/IndexPage'

export const IndexTemplate = props => {
  // Happened on a `gatsby build`, no idea why though!
  if (!props.pageResources) {
    console.error('IndexTemplate: no pageResources found')
    return <div />
  }

  const edges = props.pageResources.json.data.allSitePage.edges

  const pages = edges
    .filter(edge => edge.node.context.title)
    .map(edge => ({ path: edge.node.path, ...edge.node.context }))

  return (
    <div>
      <IndexPage {...{ pages }} />
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
    </div>
  )
}

export default IndexTemplate

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
