import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import '../layouts/css'
import { MediaControlsView } from '../components/MediaControls'

storiesOf('MediaControls', module)
  .add('Full example', () => (
    <div>
      <MediaControlsViewExample />
    </div>
  ))
  .add('isPlaying', () => (
    <div>
      <MediaControlsView
        isPlaying
        onPlay={action('onPlay')}
        onPause={action('onPause')}
      />
    </div>
  ))
  .add('isPaused', () => (
    <div>
      <MediaControlsView
        isPaused
        onPlay={action('onPlay')}
        onPause={action('onPause')}
      />
    </div>
  ))
  .add('isPending', () => (
    <div>
      <MediaControlsView isPending />
    </div>
  ))

/**
 * Example for `<MediaControlsView />`
 */

class MediaControlsViewExample extends React.Component {
  state = {
    state: 'PAUSED'
  }

  onPause = evt => {
    action('onPause')(evt)
    this.setState({ state: 'PAUSED' })
  }

  onPlay = evt => {
    action('onPlay')(evt)
    this.setState({ state: 'PLAYING' })
  }

  render () {
    const { state } = this.state

    return (
      <MediaControlsView
        isPlaying={state === 'PLAYING'}
        isPaused={state === 'PAUSED'}
        isPending={state === 'PENDING'}
        onPause={this.onPause}
        onPlay={this.onPlay}
      />
    )
  }
}
