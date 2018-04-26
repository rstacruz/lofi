import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'

import { MediaControlsView } from '../components/MediaControls'

storiesOf('MediaControlsView', module)
  .add(
    'Full example',
    withInfo({
      text: `
        The pause/play controls.

        \`<MediaControls />\` hooks up to the \`SoundcloudStore\`, but the
        \`MediaControlsView\` is pure-ish.
      `
    })(() => <MediaControlsViewExample />)
  )
  .add(
    'States',
    withInfo({})(() => (
      <div>
        <h2>isPending</h2>
        <MediaControlsView isPending />

        <h2>isPlaying</h2>
        <MediaControlsView
          isPlaying
          onPlay={action('onPlay')}
          onPause={action('onPause')}
        />

        <h2>isPaused</h2>
        <MediaControlsView
          isPaused
          onPlay={action('onPlay')}
          onPause={action('onPause')}
        />
      </div>
    ))
  )

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
