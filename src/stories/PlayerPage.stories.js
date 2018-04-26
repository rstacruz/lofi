import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'

import { PlayerPage } from '../components/PlayerPage'

storiesOf('PlayerPage', module).add(
  'Full example',
  withInfo({
    text: `
      This is the player page.
      `
  })(() => (
    <PlayerPage
      title={'Lazy Sundays'}
      soundcloudURL={'https://api.soundcloud.com/playlists/109759947'}
    />
  ))
)
