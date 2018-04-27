import React from 'react'
import PlayerPage from '../components/PlayerPage'
import { Subscribe } from 'unstated'
import SoundcloudStore from '../stores/SoundcloudStore'

/*
 * Template for player pages
 */

export const PlayerTemplate = ({ pathContext: ctx }) => {
  // const { title, href, soundcloudURL } = ctx
  return (
    <Subscribe to={[SoundcloudStore]}>
      {soundcloud => (
        <SoundcloudReseter soundcloud={soundcloud}>
          <PlayerPage {...ctx} />
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
