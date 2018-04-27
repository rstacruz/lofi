/* global graphql */
import React from 'react'
import IndexPage from '../components/IndexPage'
import { getStations } from '../queries/all_stations'

/**
 * Template for the home page.
 */

export const IndexTemplate = ({ data }) => {
  const stations = getStations(data)

  return (
    <div>
      <IndexPage {...{ stations }} />
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
    </div>
  )
}

/*
 * Default export
 */

export default IndexTemplate

/**
 * GraphQL to get all pages
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
