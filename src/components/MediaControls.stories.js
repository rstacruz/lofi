import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'

import { MediaControlsView } from '../components/MediaControls'
import StoryHeading from '../components/StoryHeading'

storiesOf('MediaControlsView', module).add(
  'Media Controls',
  withInfo({})(() => (
    <div>
      <StoryHeading title='Working example' />
      <Example>{props => <MediaControlsView {...props} />}</Example>

      <StoryHeading title='isPending' />
      <MediaControlsView isPending />

      <StoryHeading title='isPlaying' />
      <MediaControlsView
        isPlaying
        onPlay={action('onPlay')}
        onPause={action('onPause')}
      />

      <StoryHeading title='isPaused' />
      <MediaControlsView
        isPaused
        onPlay={action('onPlay')}
        onPause={action('onPause')}
      />
    </div>
  ))
)

/**
 * Example provider for `<MediaControlsView />`
 */

class Example extends React.Component {
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
    const { children } = this.props

    return children({
      isPlaying: state === 'PLAYING',
      isPaused: state === 'PAUSED',
      isPending: state === 'PENDING',
      onPause: this.onPause,
      onPlay: this.onPlay
    })
  }
}
