import React from 'react'
import { Provider } from 'unstated'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'

import PlayerPage from '../components/PlayerPage'

storiesOf('PlayerPage', module).add(
  'Full example',
  withInfo({
    text: `
      This is the player page!
      `
  })(() => (
    <Provider>
      <div
        style={{
          position: 'relative',
          width: '800px',
          height: '600px',
          margin: '0 auto'
        }}
      >
        <PlayerPage
          soundcloudURL={'https://api.soundcloud.com/playlists/109759947'}
        />
      </div>
    </Provider>
  ))
)
