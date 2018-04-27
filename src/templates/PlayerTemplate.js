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
  const { pathContext: ctx } = props

  // const { title, href, soundcloudURL } = ctx
  return (
    <Subscribe to={[SoundcloudStore]}>
      {soundcloud => (
        <SoundcloudReseter soundcloud={soundcloud}>
          <PlayerPage {...{ ...ctx, stations: [] }} />
        </SoundcloudReseter>
      )}
    </Subscribe>
  )
}

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
