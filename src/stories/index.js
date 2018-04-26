import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import '../layouts/css'
import { MediaControlsView } from '../components/MediaControls'

storiesOf('MediaControls', module)
  .add('Example', () => (
    <div>
      <MediaControlsViewExample />
    </div>
  ))
  .add('isPlaying', () => (
    <div>
      <MediaControlsView isPlaying />
    </div>
  ))
  .add('isPaused', () => (
    <div>
      <MediaControlsView isPaused />
    </div>
  ))
  .add('isPending', () => (
    <div>
      <MediaControlsView isPending />
    </div>
  ))

class MediaControlsViewExample extends React.Component {
  state = {
    state: 'PAUSED'
  }

  onPause () {
    this.setState({ state: 'PAUSED' })
  }

  onPlay () {
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
