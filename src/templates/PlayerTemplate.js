/* global graphql */
import React from 'react'
import PlayerPage from '../components/PlayerPage'
import { Subscribe } from 'unstated'
import SoundcloudStore from '../stores/SoundcloudStore'
import { getStations } from '../queries/all_stations'

/*
 * Template for player pages
 */

export const PlayerTemplate = props => {
  const { pathContext: ctx, data } = props
  const stations = getStations(data)

  // const { title, href, soundcloudURL } = ctx
  return (
    <Subscribe to={[SoundcloudStore]}>
      {soundcloud => (
        <SoundcloudReseter soundcloud={soundcloud}>
          <PlayerPage {...{ ...ctx, stations }} />
        </SoundcloudReseter>
      )}
    </Subscribe>
  )
}

/**
 * Tells the SoundcloudStore to reset itself when this appears.
 *
 * If Soundcloud was previously playing and you navigate to a new station, we
 * want to reset the state back from `state: 'PLAYING'` to `state: 'PENDING'`.
 */

class SoundcloudReseter extends React.Component {
  componentDidMount () {
    this.props.soundcloud.reset()
  }

  render () {
    return this.props.children
  }
}

/*
 * Export
 */

export default PlayerTemplate

/**
 * GraphQL to get all stations
 */

export const pageQuery = graphql`
  query PlayerTemplateQuery {
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
