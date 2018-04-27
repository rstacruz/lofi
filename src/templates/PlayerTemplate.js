/* global graphql */
import React from 'react'
import PlayerPage from '../components/PlayerPage'
import { Subscribe } from 'unstated'
import SoundcloudStore from '../stores/SoundcloudStore'

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
