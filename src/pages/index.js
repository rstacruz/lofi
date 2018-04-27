/* global graphql */
import React from 'react'
import IndexPage from '../components/IndexPage'

export const IndexTemplate = props => {
  const edges = props.pageResources.json.data.allSitePage.edges

  const pages = edges
    .filter(edge => edge.node.context.title)
    .map(edge => edge.node.context)

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
          layout
          context {
            title
            path
            href
            soundcloudURL
          }
        }
      }
    }
  }
`
